import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpidata } = useGetKpisQuery();
  const { data: productdata } = useGetProductsQuery();
  const { data: tdata } = useGetTransactionsQuery();
  // console.log(kpidata);

  const piedata = useMemo(() => {
    if (kpidata) {
      const totexp = kpidata[0].totalExpenses;
      return Object.entries(kpidata[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `Expenses excluding ${key}`,
              value: totexp - value,
            },
          ];
        }
      );
    }
  }, [kpidata]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const tColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sidetext={`${productdata?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: `hidden !important`,
            },
            "& .MuiDataGrid-menuIcon": {
              visibility: `hidden !important`,
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productdata || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      {/* Box H */}

      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sidetext={`${tdata?.length} latest transactions `}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: `hidden !important`,
            },
            "& .MuiDataGrid-menuIcon": {
              visibility: `hidden !important`,
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={tdata || []}
            columns={tColumns}
          />
        </Box>
      </DashboardBox>

      {/* Box I */}

      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown by Category" sidetext="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {piedata?.map((data, i) => {
            // console.log(data);
            return (
              <Box key={`${data[0].name}-${i}`}>
                <PieChart width={110} height={75}>
                  <Pie
                    stroke="none"
                    data={data}
                    innerRadius={18}
                    outerRadius={35}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h5">{data[0].name}</Typography>
              </Box>
            );
          })}
        </FlexBetween>
      </DashboardBox>

      {/*Box J */}

      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Expiration Date"
          sidetext="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation quis nostrud exercitation
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
