// ─── Modal.jsx ───────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { addTable, addCategory, addDish, getCategory } from "../../https";
import { enqueueSnackbar } from "notistack";

const Modal = ({ isOpen, onClose, type }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    tableNo: "",
    seats: "",
    categoryName: "",
    categoryDescription: "",
    dishName: "",
    dishPrice: "",
    dishCategory: "",
    dishDescription: "",
    dishImage: "",
    dishAvailable: true,
  });

  // Fetch categories for dish form
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategory();
      return response.data;
    },
    enabled: type === "dishes",
  });

  const categories = categoriesData?.data || [];

  useEffect(() => {
    if (isOpen) {
      setFormData({
        tableNo: "",
        seats: "",
        categoryName: "",
        categoryDescription: "",
        dishName: "",
        dishPrice: "",
        dishCategory: "",
        dishDescription: "",
        dishImage: "",
        dishAvailable: true,
      });
    }
  }, [isOpen, type]);

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  // ── Mutations ──────────────────────────────────────
  const tableMutation = useMutation({
    mutationFn: addTable,
    onSuccess: () => {
      enqueueSnackbar("Table added successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(error?.response?.data?.message || "Failed to add table", {
        variant: "error",
      });
    },
  });

  const categoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      enqueueSnackbar("Category added successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(
        error?.response?.data?.message || "Failed to add category",
        { variant: "error" },
      );
    },
  });

  const dishMutation = useMutation({
    mutationFn: addDish,
    onSuccess: () => {
      enqueueSnackbar("Dish added successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
      queryClient.invalidateQueries({ queryKey: ["menu"] });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(error?.response?.data?.message || "Failed to add dish", {
        variant: "error",
      });
    },
  });

  // ── Submit Handler ────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "table") {
      tableMutation.mutate({
        tableNo: formData.tableNo.trim(),
        seats: Number(formData.seats),
      });
    } else if (type === "category") {
      categoryMutation.mutate({
        name: formData.categoryName.trim(),
        description: formData.categoryDescription.trim() || undefined,
      });
    } else if (type === "dishes") {
      dishMutation.mutate({
        name: formData.dishName.trim(),
        price: Number(formData.dishPrice),
        category: formData.dishCategory,
        description: formData.dishDescription.trim() || undefined,
        image: formData.dishImage.trim() || undefined,
        isAvailable: formData.dishAvailable,
      });
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case "table":
        return "Add New Table";
      case "category":
        return "Add New Category";
      case "dishes":
        return "Add New Dish";
      default:
        return "Add Item";
    }
  };

  const getSubmitButtonText = () => {
    const isPending =
      tableMutation.isPending ||
      categoryMutation.isPending ||
      dishMutation.isPending;
    if (isPending) return "Adding...";
    switch (type) {
      case "table":
        return "Add Table";
      case "category":
        return "Add Category";
      case "dishes":
        return "Add Dish";
      default:
        return "Confirm";
    }
  };

  const isSubmitDisabled = () => {
    if (
      tableMutation.isPending ||
      categoryMutation.isPending ||
      dishMutation.isPending
    )
      return true;
    if (type === "table") return !formData.tableNo.trim() || !formData.seats;
    if (type === "category") return !formData.categoryName.trim();
    if (type === "dishes")
      return (
        !formData.dishName.trim() ||
        !formData.dishPrice ||
        !formData.dishCategory ||
        categories.length === 0
      );
    return false;
  };

  const renderForm = () => {
    if (type === "table") {
      return (
        <>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Table Number
            </label>
            <input
              type="text"
              name="tableNo"
              value={formData.tableNo}
              onChange={handleInputChange}
              required
              placeholder="e.g., T-01"
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
              required
              min="1"
              max="20"
              className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white"
            />
          </div>
        </>
      );
    }

    if (type === "category") {
      return (
        <>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Category Name <span className="text-[#FF5C00]">*</span>
            </label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              required
              placeholder="e.g., Appetizers"
              className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Description (Optional)
            </label>
            <textarea
              name="categoryDescription"
              value={formData.categoryDescription}
              onChange={handleInputChange}
              rows="3"
              placeholder="e.g., Starters"
              className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white resize-none"
            />
          </div>
        </>
      );
    }

    if (type === "dishes") {
      if (categoriesLoading)
        return (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5C00]"></div>
          </div>
        );

      return (
        <>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Dish Name <span className="text-[#FF5C00]">*</span>
            </label>
            <input
              type="text"
              name="dishName"
              value={formData.dishName}
              onChange={handleInputChange}
              required
              placeholder="e.g., Nasi Lemak"
              className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Price (RM) <span className="text-[#FF5C00]">*</span>
            </label>
            <input
              type="number"
              name="dishPrice"
              value={formData.dishPrice}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              placeholder="12.90"
              className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Category <span className="text-[#FF5C00]">*</span>
            </label>
            <select
              name="dishCategory"
              value={formData.dishCategory}
              onChange={handleInputChange}
              required
              className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white"
            >
              <option value="">Select Category</option>
              {categories.length > 0 ? (
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </select>
            {categories.length === 0 && (
              <p className="text-[10px] text-amber-500 mt-1 ml-2">
                ⚠️ Add a category first.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Description (Optional)
            </label>
            <textarea
              name="dishDescription"
              value={formData.dishDescription}
              onChange={handleInputChange}
              rows="3"
              placeholder="e.g., Served with sambal"
              className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="dishImage"
              value={formData.dishImage}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-[#F8F9FD] dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-[#FF5C00] outline-none transition-all dark:text-white"
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-[#F8F9FD] dark:bg-[#0B0E11] rounded-2xl">
            <label className="text-sm font-bold dark:text-white cursor-pointer">
              Available for Order
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="dishAvailable"
                checked={formData.dishAvailable}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5C00]"></div>
            </label>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-lg bg-white dark:bg-[#16191D] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-slate-100 dark:border-white/5 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-white dark:bg-[#16191D] z-10 pb-4">
              <h2 className="text-xl font-black uppercase italic leading-none">
                {getModalTitle()}
                <span className="text-[#FF5C00]">.</span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                <IoMdClose size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderForm()}
              <button
                type="submit"
                disabled={isSubmitDisabled()}
                className="w-full bg-[#FF5C00] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getSubmitButtonText()}
              </button>
            </form>
          </motion.div>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
