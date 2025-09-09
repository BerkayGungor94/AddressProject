import React, {useEffect, useState} from "react";
import axiosConfig from "../api/axiosConfig";
import ReusableTable, {Column} from "../layouts/ReusableTable";
import {ClipLoader} from "react-spinners";

interface Animal {
    id: number;
    name: string;
    bred_for: string;
    breed_group: string;
    life_span: string;
    temperament: string;
    origin: string;
    reference_image_id: string;
    image_id: string;
    width: number;
    height: number;
    url: string;
    imperialW: string;
    metricW: string;
    imperialH: string;
    metricH: string;
}

const AnimalPage: React.FC = () => {
    const [animal, setAnimal] = useState<Animal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axiosConfig.get("/animals")
            .then((res) => {
                console.log("Animals API data:", res.data);
                setAnimal(res.data);
            })
            .catch((err) => {
                const status = err.response?.status;
                const message = err.response?.data?.message;

                if (status === 401 || status === 403) {
                    if (message === "2FA required") {
                        setError("Two-factor authentication required. Please verify your OTP");
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    } else {
                        setError("Unauthorized! Please try again.");
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }
                } else {
                    setError("An error occurred while fetching data");
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const columns: Column<Animal>[] = [
        {accessor: "id", header: "Id"},
        {accessor: "name", header: "Name"},
        {accessor: "breed_group", header: "Breed Group"},
        {accessor: "bred_for", header: "Breed"},
        {accessor: "life_span", header: "Lifespan"},
        {accessor: "temperament", header: "Temperament"},
        {accessor: "origin", header: "Origin"},
        {accessor: "reference_image_id", header: "Reference Image"},
        {accessor: "image_id", header: "Image"},
        {accessor: "width", header: "Width"},
        {accessor: "height", header: "Height"},
        {accessor: "url", header: "URL"},
        {accessor: "imperialW", header: "Imperial W"},
        {accessor: "imperialH", header: "Imperial H"},
        {accessor: "metricW", header: "Metric W"},
        {accessor: "metricH", header: "Metric H"},
    ];

    return (
        <div className="container mt-5">
            <h2>Animal List</h2>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <ClipLoader size={50} color="#00BFFF" />
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <ReusableTable data={animal} columns={columns} />
            )}
        </div>
    );
};

export default AnimalPage;
