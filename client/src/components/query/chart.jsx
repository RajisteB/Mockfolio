import React from 'react';
import '../../styles/components/chart.css';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import '../../styles/components/chart.css';



const Chart = (props) => {
  let { data } = props;

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%" >
        <AreaChart
          data={data.chart1y}
          margin={{ left: -60, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="6%" stopColor="#FF5C00" stopOpacity={0.8}/>
              <stop offset="40%" stopColor="#FF5C00" stopOpacity={0.4}/>
              <stop offset="90%" stopColor="#FF5C00" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
            fill="url(#colorClose)"
            fillOpacity={0.6}            
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;