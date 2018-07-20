import React from 'react';
import '../../styles/components/chart.css';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import '../../styles/components/chart.css';



const Chart = (props) => {
  let { data } = props;
  console.log(data.chart1m);

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%" >
        <AreaChart
          data={data.chart1y}
          margin={{ left: -60, bottom: 0 }}
        >
          <XAxis 
            dataKey="date" 
            hide={true}
          />
          <YAxis 
            type="number"
            hide={true}
            domain={['auto', 'dataMax']}
            padding={{ top: 40 }}
            
          />
          <Area 
            type="basis"
            dataKey="close"
            stroke="none"
            fill="#E6A8ED"
            fillOpacity={0.4}            
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;