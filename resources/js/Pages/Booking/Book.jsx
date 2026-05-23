import { useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

const Book = ({ id, objType, title, subtitle, onSuccess }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        obj_type: objType,
        obj_id: id,
        start_date: "",
    });
    const [success, setSuccess] = useState(false);
    const minDateTime = useMemo(
        () => new Date().toISOString().slice(0, 16),
        []
    );

    function handleSubmit(e) {
        e.preventDefault();
        post(route("booking.store"), {
            onSuccess: () => {
                setSuccess(true);
                reset();
                window.setTimeout(() => {
                    onSuccess?.();
                }, 800);
            },
        });
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                {success && (
                    <div className="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700">
                        Booking confirmed successfully.
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-2 text-2xl font-bold text-slate-900">
                        Booking details
                    </h2>
                    <p className="mb-6 text-sm text-slate-600">
                        {title ? `${title} • ` : ""}
                        {subtitle || "Choose your preferred booking time."}
                    </p>

                    <div className="mb-6">
                        <label
                            htmlFor="datetime"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            name="start_date"
                            value={data.start_date}
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
                            min={minDateTime}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                        {errors.start_date && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.start_date}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? "Saving..." : "Confirm booking"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Book;
