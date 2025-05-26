import React, {useEffect, useState} from "react";
import axios from "axios";
import {ClipLoader} from "react-spinners";

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

    const [filterCountry, setFilterCountry] = useState<string>("");
    const [filterCity, setFilterCity] = useState<string>("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const sortByCountry = () => {
        const sorted = [...addresses].sort((a, b) => a.country.localeCompare(b.country));
        setAddresses(sorted);
    };

    const sortByCity = () => {
        const sorted = [...addresses].sort((a, b) => a.city.localeCompare(b.city));
        setAddresses(sorted);
    }

    const fetchAddress = () => {
        setLoading(true);
        setError(null);

        axios.get("http://localhost:8080/addresses", {
            params: {
                country,
                city
            }
        })
            .then(res => {
                setAddresses(res.data);
            })
            .catch(err => {
                setError("An error occured while getting datas!");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchAddress();
    }, [country, city]); //filtreler yeniden doldurulduğunda autoFetch yapacak!

    return (
        <div className="container mt-5">
            <h2>Address List</h2>

            <div className="mb-3 d-flex gap-3">
                <input
                    type="text"
                    placeholder="Filter By Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-control"
                />
                <input
                    type="text"
                    placeholder="Filter By City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                />
            </div>
            <button onClick={sortByCountry} className="btn btn-primary m-2">Sort By Country</button>
            <button onClick={sortByCity} className="btn btn-primary m-2">Sort By City</button>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <ClipLoader size={50} color="#00BFFF"/>
                </div>
            ) : error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Building Number</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>Street Name</th>
                        <th>Zip Code</th>
                    </tr>
                    </thead>
                    <tbody>
                    {addresses && addresses.length > 0 ? (
                        addresses.map((a) => (
                            <tr key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.latitude}</td>
                                <td>{a.longitude}</td>
                                <td>{a.buildingNumber}</td>
                                <td>{a.country}</td>
                                <td>{a.city}</td>
                                <td>{a.street}</td>
                                <td>{a.streetName}</td>
                                <td>{a.zipcode}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No addresses found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AddressPage;
