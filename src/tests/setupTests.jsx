import { fireEvent, render as rtlRender } from "@testing-library/react";
import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "../js/app/theme";
import { createSerializer } from "enzyme-to-json";
import "@testing-library/jest-dom";

// React 16 Enzyme adapter

// Note that enzyme-to-json snapshot serializer is configured in
// jest configuration settings specified in package.json instead of here.
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

const wrapWithProviders = (ui, createAppStore) => {
    let wrappedUi = <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
    if (createAppStore) wrappedUi = <Provider store={createAppStore()}> {wrappedUi} </Provider>;
    return wrappedUi;
};

const renderWithProviders = (ui, createAppStore) => {
    return rtlRender(wrapWithProviders(ui, createAppStore));
};

// Globals are defined here to limit import redundancies.
global.fireEvent = fireEvent;
global.mount = mount;
global.React = React;
global.render = render;
global.renderWithProviders = renderWithProviders;
global.wrapWithProviders = wrapWithProviders;
global.shallow = shallow;
