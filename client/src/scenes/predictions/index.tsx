import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, {DataPoint} from "regression"

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpidata } = useGetKpisQuery();

  const formatteddata = useMemo(() => {
    if (!kpidata) return [];
    const formatted:Array<DataPoint> = kpidata[0].monthlyData.map(
      ( obj , i) => {
        return [i,obj.revenue]
      }
    );
    const regressionLine=regression.linear(formatted);
    return kpidata[0].monthlyData.map(
        ( {month,revenue} , i) => {
          return {
            name:month,
            "Actual Revenue": revenue,
            "Regression Line": regressionLine.points[i][1],
            "Prediction Line": regressionLine.predict(i+12)[1]
          }
        }
      );


  }, [kpidata]);

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3"> Revene and Predictions </Typography>
          <Typography variant="h6">
            charted revenue and predicted revenue based on a simple linear
            regresssion model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            bgcolor: palette.grey[700],
            boxShadow: "0.1rem 0.1 rem 0.1 rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          Show Predicted Revenue
        </Button>
      </FlexBetween>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart
          data={formatteddata}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={palette.grey[800]}
          />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideLeft" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={false}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value="Revenue in USD"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Reression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Prediction Line"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
