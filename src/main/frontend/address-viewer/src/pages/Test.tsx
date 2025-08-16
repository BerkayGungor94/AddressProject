import React from "react";
import ReusableTable from "../layouts/ReusableTable";

interface Person {
    name: string;
    surname: string;
}

const TestPage: React.FC = () => {
    const people: Person[] = [
        { name: "Ahmet", surname: "Yılmaz" },
        { name: "Ayşe", surname: "Kara" },
        { name: "Mehmet", surname: "Demir" },
    ];

    const columns: { header: string; accessor: keyof Person }[] = [
        { header: "Name", accessor: "name" },
        { header: "Surname", accessor: "surname" },
    ];

    return (
        <div className="container mt-4">
            <h3>People Table</h3>
            <ReusableTable data={people} columns={columns} searchable />
        </div>
    );
};

export default TestPage;
