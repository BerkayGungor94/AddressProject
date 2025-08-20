import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import ReusableTable, { Column } from "../layouts/ReusableTable";

interface Articles {
    id: number;
    sourceId: bigint;
    sourceName: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}

const ArticlesPage: React.FC = () => {
    const [articles, setArticles] = useState<Articles[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get("http://localhost:8080/articles")
            .then(res => {
                setArticles(res.data);
            })
            .catch(err => {
                setError("An error occurred while fetching data!");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const columns: Column<Articles>[] = [
        { accessor: "id", header: "Id", filterType: "number" },
        { accessor: "sourceId", header: "Source Id", filterType: "text" },
        { accessor: "sourceName", header: "Source Name", filterType: "text" },
        { accessor: "author", header: "Author", filterType: "text" },
        { accessor: "title", header: "Title", filterType: "text" },
        { accessor: "description", header: "Description", filterType: "text" },
        { accessor: "url", header: "Url", filterType: "text" },
        { accessor: "urlToImage", header: "UrlToImage", filterType: "text" },
        { accessor: "publishedAt", header: "Published Date", filterType: "date" },
        { accessor: "content", header: "Content", filterType: "text" },
    ];

    return (
        <div className="container mt-5">
            <h2>Articles</h2>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <ClipLoader size={50} color="#00BFFF" />
                </div>
            ) : error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : (
                <ReusableTable data={articles} columns={columns} />
            )}
        </div>
    );
};

export default ArticlesPage;
