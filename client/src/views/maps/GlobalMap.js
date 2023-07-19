import { Grid } from "@mui/material"
import { gridSpacing } from '../../store/constant'
import WorldMap from "./components/Map";
import MainCard from "ui-component/cards/MainCard";
import { useState } from "react";
import markers from 'data/global.json';
import _ from 'lodash';
import BasicTable from "ui-component/cards/BasicTable";

const PopupTemplate = (props) => {
    const { payload } = props;

    return <div> {payload?.region} </div>
}

const IndiaMap = props => {

    const [region, setRegion] = useState([20.5937, 72.9629]);
    const [selection, setSelection] = useState(null);

    const transformSelection = (payload) => {
        return _.map(payload, (value, key) => {
            return {
                key,
                value
            }
        })
    }

    const markerConfig = {
        fetchCoordinates: (payload) => {
            const { position } = payload;
            return position ? position : null;
        },
        popupTemplate: (payload) => {
            return <PopupTemplate payload={payload} />
        },
        zoomLevel: 7
    }

    const renderSelectionData = () => {
        if (!selection) return null;
        const data = transformSelection(selection);
        if (!data) return null;

        return <Grid item xs={12}>
            <BasicTable data={data} columns={['key', 'value']} />
        </Grid>
    }

    return <MainCard title="Global Weather Report">
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <WorldMap setSelection={setSelection} markers={markers} region={region} zoom={4} markerConfig={markerConfig} />
            </Grid>
            {renderSelectionData()}
        </Grid>
    </MainCard>
}

export default IndiaMap;