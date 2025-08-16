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
        { accessor: "latitude", header: "Latitude" },
        { accessor: "longitude", header: "Longitude" },
        { accessor: "buildingNumber", header: "Building Number" },
        { accessor: "country", header: "Country" },
        { accessor: "city", header: "City" },
        { accessor: "street", header: "Street" },
        { accessor: "streetName", header: "Street Name" },
        { accessor: "zipcode", header: "Zip Code" },
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
                <ReusableTable data={addresses} columns={columns} searchable />
            )}
        </div>
    );
};

export default AddressPage;
