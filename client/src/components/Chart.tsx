import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button } from './components/ui/button';

const Chart = () => {
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
            <div className="container px-5 py-10 mx-auto flex flex-wrap">
                <div className="lg:w-2/3 mx-auto">
                    <Button onClick={updateData}>Update Data</Button>
                    <Bar data={data} />
                </div>
            </div>
        </>
    )
}

export default Chart