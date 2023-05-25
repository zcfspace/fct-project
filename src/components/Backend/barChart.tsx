import React, { useState, useEffect } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { format } from "date-fns";

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

type OrderByDay = {
  createdAt: string;
  _count: {
    createdAt: number;
  };
};

function BarChart() {
  const [ordersByDate, setOrdersByDate] = useState<OrderByDay[]>([]);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  const getOrdersByDate = async () => {
    try {
      const response = await fetch(`/api/dashboard/get`);
      const data = await response.json();
      setOrdersByDate(data.ordersByDay);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrdersByDate();
  }, []);

  useEffect(() => {
    if (ordersByDate.length > 0) {
      if (chartInstance) chartInstance.destroy();

      const groupedOrders = ordersByDate.reduce((acc, order) => {
        const date = format(new Date(order.createdAt), "dd/MM/yyyy");
        if (acc[date]) {
          acc[date] += order._count.createdAt;
        } else {
          acc[date] = order._count.createdAt;
        }
        return acc;
      }, {} as any);


      const labels = Object.keys(groupedOrders);
      const data = Object.values(groupedOrders);

      const ctx = document.getElementById("myChart") as HTMLCanvasElement;
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Orders by day",
              data,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  return `Cantidad de pedido: ${context.parsed.y}`;
                },
              },
            },
          },
        },
      });
      setChartInstance(newChartInstance as Chart);
    }
  }, [ordersByDate]);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <h1 className="text-center text-2xl font-bold text-green-500 mt-4 mb-6">Resumen de comandas</h1>
        <canvas id="myChart"></canvas>
      </div>
    </>
  );
}

export default BarChart;
