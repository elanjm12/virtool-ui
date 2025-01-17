import React from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader } from "../../../../base";
import { editIsolate, hideOTUModal } from "../../../actions";
import IsolateForm from "./Form";

const getInitialState = props => ({
    sourceType: props.sourceType || (props.restrictSourceTypes ? "unknown" : ""),
    sourceName: props.sourceName || ""
});

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = getInitialState(this.props);
    }

    handleChange = update => {
        this.setState(update);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSave(this.props.otuId, this.props.isolateId, this.state.sourceType, this.state.sourceName);
    };

    render() {
        return (
            <Modal label="Edit Isolate" show={this.props.show} onHide={this.props.onHide}>
                <ModalHeader>Edit Isolate</ModalHeader>
                <IsolateForm
                    sourceType={this.state.sourceType}
                    sourceName={this.state.sourceName}
                    allowedSourceTypes={this.props.allowedSourceTypes}
                    restrictSourceTypes={this.props.restrictSourceTypes}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    show: state.otus.editIsolate,
    allowedSourceTypes: state.references.detail.source_types,
    restrictSourceTypes: state.references.detail.restrict_source_types
});

const mapDispatchToProps = dispatch => ({
    onHide: () => {
        dispatch(hideOTUModal());
    },

    onSave: (otuId, isolateId, sourceType, sourceName) => {
        dispatch(editIsolate(otuId, isolateId, sourceType, sourceName));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
