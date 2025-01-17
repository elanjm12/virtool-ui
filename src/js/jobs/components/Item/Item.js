import React, { useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getFontSize, getFontWeight } from "../../../app/theme";
import { AffixedProgressBar, Attribution, LinkBox } from "../../../base";
import { getWorkflowDisplayName } from "../../../utils/utils";
import { cancelJob, removeJob } from "../../actions";
import { JobAction } from "./Action";
import { JobStatus } from "./Status";

const JobItemBody = styled.div`
    font-size: ${getFontSize("lg")};
    padding: 10px 15px;

    ${Attribution} {
        font-size: ${getFontSize("md")};
    }
`;

const JobItemContainer = styled.div`
    position: relative;
`;

const JobItemHeader = styled.div`
    align-items: center;
    display: flex;
    font-weight: ${getFontWeight("thick")};
`;

const JobItemLinkBox = styled(LinkBox)`
    padding: 5px 0 0 0;
    z-index: 10;
`;

const JobActionOverlay = styled.div`
    background-color: transparent;
    font-size: 17px;
    padding: 15px 15px 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
`;

export function JobItem({ id, workflow, state, progress, created_at, user, canCancel, canRemove, onCancel, onRemove }) {
    const handleCancel = useCallback(() => onCancel(id), [id, onCancel]);
    const handleRemove = useCallback(() => onRemove(id), [id, onRemove]);

    let progressColor = "green";

    if (state === "running") {
        progressColor = "blue";
    }

    if (state === "error" || state === "cancelled") {
        progressColor = "red";
    }

    // Create the option components for the selected fields.
    return (
        <JobItemContainer>
            <JobItemLinkBox to={`/jobs/${id}`}>
                <AffixedProgressBar now={progress} color={progressColor} />

                <JobItemBody>
                    <JobItemHeader>
                        <span>{getWorkflowDisplayName(workflow)}</span>
                        <JobStatus state={state} pad={canCancel || canRemove} />
                    </JobItemHeader>
                    <Attribution time={created_at} user={user.handle} />
                </JobItemBody>
            </JobItemLinkBox>
            <JobActionOverlay>
                <JobAction
                    key={state}
                    state={state}
                    canCancel={canCancel}
                    canRemove={canRemove}
                    onCancel={handleCancel}
                    onRemove={handleRemove}
                />
            </JobActionOverlay>
        </JobItemContainer>
    );
}

export const mapDispatchToProps = dispatch => ({
    onCancel: jobId => {
        dispatch(cancelJob(jobId));
    },

    onRemove: jobId => {
        dispatch(removeJob(jobId));
    }
});

export default connect(null, mapDispatchToProps)(JobItem);
