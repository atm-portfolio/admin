import React, { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { apiBaseUrl } from '../../utils/constants';
import { apiWithToken } from '../../utils/service';
import { ReportData } from '../../types/reports';
import Input from '../../components/Input';

import './ReportSummary.scss';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Count: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(R: ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function ReportSummary(): React.ReactElement {
  const [reportData, setReportData] = useState<ReportData | undefined>();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (
    _: React.MouseEvent,
    index: React.SetStateAction<number>
  ) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    apiWithToken()
      .get(`${apiBaseUrl}/reports`)
      .then((res) => res.data)
      .then((data) => setReportData(data));
  }, []);

  const userList = useMemo(() => {
    return [
      { _id: '', name: 'Select user' },
      ...(reportData?.userVsProduct.map((user) => {
        return { _id: user._id?.id, name: user._id.name };
      }) || []),
    ];
  }, [reportData]);

  const userInfo = useMemo(() => {
    return reportData?.userVsProduct.find((user) => {
      return user._id?.id === selectedUser;
    });
  }, [reportData, selectedUser]);

  const userData = useMemo(() => {
    if (!userInfo) {
      return [];
    }

    return userInfo?.products.map((item) => {
      return {
        name: item.product?.name,
        value: item.count,
        fill: `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`,
      };
    });
  }, [userInfo]);

  return (
    <div className="report">
      <h3>
        <Link to="/">Home</Link> {'>'} <span>Reports</span>
      </h3>

      <h4>Projects and Products</h4>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          width={500}
          height={300}
          data={reportData?.projects}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="products" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <hr />
      <h4>Users and Products</h4>

      <Input
        label="User"
        name="user"
        type="select"
        options={userList}
        onChange={(event) => setSelectedUser(event.target.value)}
      />

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={userData}
            activeShape={renderActiveShape}
            activeIndex={activeIndex}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {userData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
