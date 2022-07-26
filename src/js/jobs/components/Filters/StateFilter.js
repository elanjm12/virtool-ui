import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { SidebarHeader, SideBarSection } from "../../../base";
import { findJobs } from "../../actions";
import { getJobCountsByState, getStatesFromURL } from "../../selectors";
import { StateCategory } from "./StateCategory";
import { difference, union, xor } from "lodash-es";

const active = ["waiting", "preparing", "running"];
const inactive = ["complete", "cancelled", "errored", "terminated"];

const filterStatesByCategory = (category, selected) => {
    const options = category === "active" ? active : inactive;

    const diff = difference(selected, options);

    if (selected.length - difference(selected, options).length === options.length) {
        return diff;
    }

    return union(selected, options);
};

const StyledStatusFilter = styled(SideBarSection)`
    position: relative;
    z-index: -1;
    align-items: center;
    width: 320px;
    margin: 0;
`;

export const StateFilter = ({ counts, states, onUpdateJobStateFilter }) => {
    const handleClick = value =>
        onUpdateJobStateFilter(
            value === "active" || value === "inactive" ? filterStatesByCategory(value, states) : xor(states, [value])
        );

    return (
        <StyledStatusFilter>
            <SidebarHeader>State</SidebarHeader>
            <StateCategory
                label="Active"
                states={[
                    {
                        active: states.includes("waiting"),
                        color: "grey",
                        count: counts.waiting,
                        state: "waiting"
                    },
                    {
                        active: states.includes("preparing"),
                        count: counts.preparing,
                        state: "preparing",
                        color: "grey"
                    },
                    { active: states.includes("running"), count: counts.running, state: "running", color: "blue" }
                ]}
                onClick={handleClick}
            />
            <StateCategory
                label="Inactive"
                states={[
                    {
                        active: states.includes("complete"),
                        count: counts.complete,
                        state: "complete",
                        color: "green"
                    },
                    {
                        active: states.includes("cancelled"),
                        count: counts.cancelled,
                        state: "cancelled",
                        color: "red"
                    },
                    {
                        active: states.includes("errored"),
                        count: counts.errored,
                        state: "errored",
                        color: "red"
                    },
                    {
                        active: states.includes("terminated"),
                        count: counts.terminated,
                        state: "terminated",
                        color: "red"
                    }
                ]}
                onClick={handleClick}
            />
        </StyledStatusFilter>
    );
};

export const mapStateToProps = state => ({
    counts: getJobCountsByState(state),
    states: getStatesFromURL(state)
});

export const mapDispatchToProps = dispatch => ({
    onUpdateJobStateFilter: states => {
        dispatch(findJobs(states));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StateFilter);
