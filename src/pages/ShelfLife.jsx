import React, { useState } from "react";
import axios from "axios";

const ShelfLife = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const SHELF_LIFE = {
        "fresh apple": 30, "fresh banana": 7, "fresh bellpepper": 10,
        "fresh carrot": 20, "fresh cucumber": 7, "fresh mango": 7,
        "fresh orange": 20, "fresh potato": 60
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const loadImageBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]); // Remove metadata
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Please select an image first.");
            return;
        }

        setLoading(true);
        try {
            const imageBase64 = await loadImageBase64(file);
            const response = await axios({
                method: "POST",
                url: "https://detect.roboflow.com/shelf-life-prediction/4",
                params: { api_key: import.meta.env.VITE_ROBOFLOW_SHELFLIFE_API_KEY },
                data: imageBase64,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            const detections = response.data.predictions.map((prediction) => {
                const className = prediction.class;
                const isRotten = className.includes("rotten");
                const estimatedDays = SHELF_LIFE[className] || "Unknown";
                return {
                    class: className,
                    message: isRotten
                        ? `⚠️ Remove the ${className.replace("rotten ", "")} from the shelf immediately!`
                        : `✅ Estimated shelf life: ${estimatedDays} days.`
                };
            });

            setResult(detections);
        } catch (error) {
            console.error("Error:", error);
            setResult([{ class: "Error", message: "Failed to fetch prediction." }]);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Shelf Life Prediction</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 p-2 border rounded-md"
            />

            {preview && (
                <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-md shadow-md mb-4" />
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Processing..." : "Check Shelf Life"}
            </button>

            {result && (
                <div className="mt-6 bg-white p-4 rounded-md shadow-md w-full max-w-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Prediction Results:</h2>
                    {result.map((item, index) => (
                        <p key={index} className="text-lg">
                            <strong>{item.class}</strong>: {item.message}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShelfLife;
