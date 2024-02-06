import Navbar from "@/Navbar";
import { Button } from "@/components/ui/button"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const [data, setData] = useState({
        labels: labels,
        datasets: [{
            label: 'Expenses by Month',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgb(153, 102, 255)'
            ],
            borderColor: [
                'rgb(153, 102, 255)'
            ],
            borderWidth: 1
        }]
    });

    // Function to update data with new dataset
    const updateData = () => {
        setData({
            ...data,
            datasets: [{
                ...data.datasets[0],
                data: [1, 2, 4, 8, 16, 32, 64]
            }]
        });
    };

    return (
        <>
            <Navbar />
            <div className="container px-5 py-10 mx-auto flex flex-wrap">
                <div className="lg:w-2/3 mx-auto">
                    <Button onClick={updateData}>Update Data</Button>
                    <Bar data={data} />

                </div>
            </div>


        </>
    )
}

export default Home;
