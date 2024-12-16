import React from "react";
import { useAuth } from "../providers/AuthProvider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Return from "../components/Return";
import Price from "../components/Price";

const CustomPoint = ({ x, y, highlighted }) => {
  return (
    <circle
      cx={x}
      cy={y}
      r={highlighted ? 8 : 5} // Larger circle when highlighted
      fill="#FFFFFF" // White fill for the circle
      stroke="#800080" // Purple border
      strokeWidth={highlighted ? 3 : 2} // Thicker border when highlighted
    />
  );
};

const data = [
  { name: "Mon", value: 2 },
  { name: "Tue", value: 5.5 },
  { name: "Wed", value: 2 },
  { name: "Thu", value: 8.5 },
  { name: "Fri", value: 1.5 },
  { name: "Sat", value: 5 },
  { name: "Sun", value: 6.2 },
];

const ReturnsMade = ({ companyBought }) => {
  const { backendUrl } = useAuth();
  const {
    companyId,
    companyName,
    companyLogo,
    companyReturn,
    invested_amount,
    profit_made,
  } = companyBought;
  return (
    <section>
      <div className="flex flex-row gap-5 w-full h-full">
        <div className="bg-white rounded-xl w-[59%] h-full">
          <div className="flex flex-row justify-between items-center p-5">
            <div className="flex flex-row justify-center items-center gap-3 text-[34px] font-medium">
              <img
                src={`${backendUrl}/images/logos/${companyLogo}`}
                alt="Logo"
                className="w-[55px]"
              />
              {companyName}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-white-200 flex flex-row gap-2">
                {" "}
                Current Stock Value{" "}
                <Return
                  type={companyReturn >= 0 ? "positive" : "negative"}
                  number={companyReturn}
                />
              </div>
              <div>
                <Price
                  price={invested_amount + profit_made}
                  styles={"absolute -right-4 top-0 w-4"}
                  textStyles={"text-[24px]"}
                />
              </div>
            </div>
          </div>
          <LineChart
            width={760}
            height={400}
            data={data}
            className="p-2 -translate-x-12"
          >
            <div className="recharts-tooltip-cursor" />
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                dy: 6,
                fontSize: 12,
                fill: "#9AA0A6",
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                dx: -5,
                fontSize: 12,
                fill: "#9AA0A6",
              }}
            />
            <Tooltip />
            <Line
              type="linear"
              dataKey="value"
              stroke="#6143F0"
              strokeWidth={4}
              dot={{
                fill: "#FFFFFF",
                stroke: "#6143F0",
                strokeWidth: 4,
                r: 8,
              }}
              activeDot={{
                r: 8,
                fill: "#6143F0",
                strokeWidth: 4,
              }}
            />
          </LineChart>
        </div>
      </div>
    </section>
  );
};

export default ReturnsMade;
