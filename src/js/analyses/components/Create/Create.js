import { forEach } from "lodash-es";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getAccountId } from "../../../account/selectors";
import { pushState } from "../../../app/actions";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "../../../base";
import { getDefaultSubtractions, getSampleDetailId, getSampleLibraryType } from "../../../samples/selectors";
import { getDataTypeFromLibraryType } from "../../../samples/utils";
import { shortlistSubtractions } from "../../../subtraction/actions";
import { getReadySubtractionShortlist } from "../../../subtraction/selectors";
import { routerLocationHasState } from "../../../utils/utils";
import { analyze } from "../../actions";
import { getCompatibleIndexesWithLibraryType } from "../../selectors";
import HMMAlert from "../HMMAlert";
import { useCreateAnalysis } from "./hooks";
import { ReferenceSelector } from "./ReferenceSelector";
import { SubtractionSelector } from "./SubtractionSelector";
import { CreateAnalysisSummary } from "./Summary";
import { WorkflowSelector } from "./WorkflowSelector";

const CreateAnalysisFooter = styled(ModalFooter)`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const CreateAnalysis = ({
    accountId,
    compatibleIndexes,
    dataType,
    defaultSubtractions,
    hasHmm,
    sampleId,
    show,
    subtractionOptions,
    onAnalyze,
    onHide,
    onShortlistSubtractions
}) => {
    useEffect(() => {
        if (show) {
            onShortlistSubtractions();
        }
    }, [show]);

    const { errors, references, subtractions, workflows, setErrors, setReferences, setSubtractions, setWorkflows } =
        useCreateAnalysis(dataType, defaultSubtractions);

    const handleSubmit = e => {
        e.preventDefault();

        const errors = {
            references: !references.length,
            workflows: !workflows.length
        };

        if (errors.references || errors.workflows) {
            return setErrors(errors);
        }

        onAnalyze(sampleId, references, subtractions, accountId, workflows);
        onHide();
    };

    return (
        <Modal label="Analyze" show={show} size="lg" onHide={onHide}>
            <ModalHeader>Analyze</ModalHeader>
            <form onSubmit={handleSubmit}>
                <ModalBody>
                    <HMMAlert />
                    <WorkflowSelector
                        dataType={dataType}
                        hasError={errors.workflows}
                        hasHmm={hasHmm}
                        workflows={workflows}
                        onSelect={setWorkflows}
                    />
                    {dataType === "genome" && (
                        <SubtractionSelector
                            subtractions={subtractionOptions}
                            value={subtractions}
                            onChange={setSubtractions}
                        />
                    )}
                    <ReferenceSelector
                        hasError={errors.references}
                        indexes={compatibleIndexes}
                        selected={references}
                        onChange={setReferences}
                    />
                </ModalBody>
                <CreateAnalysisFooter>
                    <CreateAnalysisSummary
                        sampleCount={1}
                        indexCount={references.length}
                        workflowCount={workflows.length}
                    />
                    <Button type="submit" color="blue" icon="play">
                        Start
                    </Button>
                </CreateAnalysisFooter>
            </form>
        </Modal>
    );
};

export const mapStateToProps = state => ({
    accountId: getAccountId(state),
    compatibleIndexes: getCompatibleIndexesWithLibraryType(state),
    dataType: getDataTypeFromLibraryType(getSampleLibraryType(state)),
    defaultSubtractions: getDefaultSubtractions(state).map(subtraction => subtraction.id),
    hasHmm: Boolean(state.hmms.total_count),
    sampleId: getSampleDetailId(state),
    show: routerLocationHasState(state, "createAnalysis"),
    subtractionOptions: getReadySubtractionShortlist(state)
});

export const mapDispatchToProps = dispatch => ({
    onAnalyze: (sampleId, references, subtractionIds, accountId, workflows) => {
        forEach(references, refId => {
            forEach(workflows, workflow => dispatch(analyze(sampleId, refId, subtractionIds, accountId, workflow)));
        });
    },
    onHide: () => {
        dispatch(pushState({}));
    },
    onShortlistSubtractions: () => {
        dispatch(shortlistSubtractions());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAnalysis);
