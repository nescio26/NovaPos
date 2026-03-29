import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTable } from "../../https";
import { enqueueSnackbar } from "notistack";

const apiFnMap = {
  table: addTable,
  category: null,
  dishes: null,
};

const Modal = ({ isOpen, onClose, type }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    tableNo: "",
    seats: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ tableNo: "", seats: "" });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const tableMutation = useMutation({
    mutationFn: (payload) => {
      const apiFn = apiFnMap[type];
      if (!apiFn) {
        enqueueSnackbar("This action is not yet implemented", {
          variant: "info",
        });
        return Promise.reject("Function not found");
      }
      return apiFn(payload);
    },
    onSuccess: () => {
      enqueueSnackbar("Table added successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      onClose();
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to add table";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type !== "table") return;

    const payload = {
      tableNo: formData.tableNo.trim(),
      seats: Number(formData.seats),
    };

    tableMutation.mutate(payload);
  };

  return (
    <AnimatePresence>
      {isOpen && type === "table" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white dark:bg-[#16191D] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-slate-100 dark:border-white/5"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black uppercase italic leading-none">
                Add New Table<span className="text-[#FF5C00]">.</span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-xl"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Table Number
                </label>
                <input
                  type="text"
                  name="tableNo"
                  value={formData.tableNo}
                  onChange={handleInputChange}
                  placeholder="e.g. T-01"
                  required
                  className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Total Seats
                </label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  placeholder="4"
                  required
                  min="1"
                  className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white"
                />
              </div>

              {/* ✅ Fixed: was mutation.isPending, now tableMutation.isPending */}
              <button
                type="submit"
                disabled={tableMutation.isPending}
                className="w-full bg-[#FF5C00] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {tableMutation.isPending ? "Adding..." : "Confirm Table"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
