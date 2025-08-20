import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import ReusableTable, { Column } from "../layouts/ReusableTable";

interface Address {
    id: number;
    latitude: bigint;
    longitude: bigint;
    country: string;
    city: string;
    street: string;
    streetName: string;
    buildingNumber: string;
    zipcode: string;
}

const AddressPage: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get("http://localhost:8080/addresses")
            .then(res => {
                setAddresses(res.data);
            })
            .catch(err => {
                setError("An error occurred while fetching data!");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const columns: Column<Address>[] = [
        { accessor: "id", header: "Id" },
        { accessor: "latitude", header: "Latitude", filterType: "number" },
        { accessor: "longitude", header: "Longitude", filterType: "number" },
        { accessor: "buildingNumber", header: "Building Number", filterType: "number" },
        { accessor: "country", header: "Country", filterType: "text" },
        { accessor: "city", header: "City", filterType: "text" },
        { accessor: "street", header: "Street", filterType: "text" },
        { accessor: "streetName", header: "Street Name", filterType: "text" },
        { accessor: "zipcode", header: "Zip Code", filterType: "number" },
    ];

    return (
        <div className="container mt-5">
            <h2>Address List</h2>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <ClipLoader size={50} color="#00BFFF" />
                </div>
            ) : error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : (
                <ReusableTable data={addresses} columns={columns} />
            )}
        </div>
    );
};

export default AddressPage;
