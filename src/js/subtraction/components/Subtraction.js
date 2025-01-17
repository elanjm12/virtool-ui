import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, NarrowContainer } from "../../base";
import FileManager from "../../files/components/Manager";
import SubtractionCreate from "./Create";
import SubtractionDetail from "./Detail/Detail";
import SubtractionList from "./List";

export const SubtractionFileManager = () => (
    <FileManager
        fileType="subtraction"
        message="Drag FASTA files here to upload"
        tip="Accepts files ending in fa, fasta, fa.gz, or fasta.gz."
        validationRegex={/.(?:fa|fasta)(?:.gz|.gzip)?$/}
    />
);

const Subtraction = () => (
    <Container>
        <NarrowContainer>
            <Switch>
                <Route path="/subtractions" component={SubtractionList} exact />
                <Route path="/subtractions/files" component={SubtractionFileManager} />
                <Route path="/subtractions/create" component={SubtractionCreate} />
                <Route path="/subtractions/:subtractionId" component={SubtractionDetail} />
            </Switch>
        </NarrowContainer>
    </Container>
);

export default Subtraction;
