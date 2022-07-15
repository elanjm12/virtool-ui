import React, { useState, useEffect } from "react";
import { Button, LoadingPlaceholder, BoxGroup } from "../../base";
import CreateGroup from "./CreateGroup";
import { connect } from "react-redux";
import styled from "styled-components";
import { setGroupPermission, removeGroup, listGroups, changeActiveGroup } from "../../groups/actions";
import { SelectedPermissions } from "./SelectedPermissions";
import { SelectedGroup } from "./SelectedGroup";
import { findUsers } from "../../users/actions";
import { SelectedGroupMembers } from "./SelectedGroupMembers";
import { getActiveId, getGroups, getLoading, getUsers } from "../selectors";

const ManageGroupsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 15px;
`;

const StyledGroupsHeader = styled.div`
    display: flex;
    padding-bottom: 5px;
    button {
        height: 50%;
        margin-top: 25%;
        margin-left: 15px;
    }
`;

const StyledGroupsButton = styled(Button)`
    margin-top: 5px;
`;

const StyledNoneFoundContainer = styled(BoxGroup)`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.color.greyLightest};
    flex: 1 1 auto;
    height: 200px;
`;

const NoneSelected = styled.div`
    color: ${props => props.theme.color.greyDarkest};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const GroupSelector = ({
    loading,
    groups,
    users,
    activeId,
    onChangeActiveGroup,
    onSetPermission,
    onRemove,
    onListGroups,
    onFindUsers
}) => {
    const [showGroupCreation, setShowGroupCreation] = useState(false);

    useEffect(() => {
        onListGroups();
        onFindUsers();
    }, []);

    if (loading) {
        return <LoadingPlaceholder margin="130px" />;
    }

    let groupComponents;

    if (!groups.length) {
        groupComponents = (
            <StyledNoneFoundContainer>
                <NoneSelected>No Groups Found</NoneSelected>
            </StyledNoneFoundContainer>
        );
    } else {
        groupComponents = (
            <>
                <ManageGroupsContainer>
                    <SelectedGroup activeId={activeId} onChangeActiveGroup={onChangeActiveGroup} groupsList={groups} />

                    <SelectedPermissions activeId={activeId} onSetPermission={onSetPermission} groupsList={groups} />

                    <SelectedGroupMembers activeId={activeId} users={users} />
                </ManageGroupsContainer>

                <StyledGroupsButton icon="trash" color="red" onClick={() => onRemove(activeId)}>
                    Remove Group
                </StyledGroupsButton>
            </>
        );
    }

    return (
        <>
            <StyledGroupsHeader>
                <h2>Manage Groups</h2>
                <Button icon="user-plus" tip="Create Group" color="blue" onClick={() => setShowGroupCreation(true)} />
            </StyledGroupsHeader>

            {groupComponents}

            <CreateGroup showGroupCreation={showGroupCreation} setShowGroupCreation={setShowGroupCreation} />
        </>
    );
};

const mapStateToProps = state => {
    return {
        loading: getLoading(state),
        groups: getGroups(state),
        users: getUsers(state),
        activeId: getActiveId(state)
    };
};

const mapDispatchToProps = dispatch => ({
    onListGroups: () => {
        dispatch(listGroups());
    },

    onRemove: groupId => {
        dispatch(removeGroup(groupId));
    },

    onSetPermission: (groupId, permission, value) => {
        dispatch(setGroupPermission(groupId, permission, value));
    },

    onFindUsers: () => dispatch(findUsers("", 1)),

    onChangeActiveGroup: activeGroup => dispatch(changeActiveGroup(activeGroup))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);
