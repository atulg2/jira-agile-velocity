import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import RoadmapChart from '../../../components/Charts/Nivo/RoadmapChart';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { iRootState } from '../../../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    }
  })
);

const mapState = (state: iRootState) => ({
  defaultPoints: state.global.defaultPoints,
  roadmap: state.roadmap.roadmap,
  selectedTab: state.roadmap.selectedTab
});

const mapDispatch = (dispatch: any) => ({
  setDefaultPoints: dispatch.global.setDefaultPoints
});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const Chart: FC<connectedProps> = ({ defaultPoints, roadmap, selectedTab }) => {
  const classes = useStyles();
  let metric = 'points';
  if (!defaultPoints) {
    metric = 'issues';
  }

  if (Object.values(roadmap).length > 0 && selectedTab === 'chart') {
    return (
      <Paper className={classes.root}>
        <Typography variant='h5' component='h3'>
          Completion and forecasting
        </Typography>
        <Typography component='p'>Displaying values in {metric}</Typography>

        <RoadmapChart roadmap={roadmap} defaultPoints={defaultPoints} />
      </Paper>
    );
  } else {
    return null;
  }
};

export default connect(
  mapState,
  mapDispatch
)(Chart);
