import React, { useState, useEffect } from "react";
import { getCategory, getDish } from "../../https/index.js";
import api from "../../https/index.js";
import { BiSolidDish, BiSearch, BiChevronDown, BiPencil } from "react-icons/bi";
import { MdOutlineNoFood, MdClose, MdFilterListOff } from "react-icons/md";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";

// ─── Reusable UI Components ──────────────────────────────────────────────────
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400",
    success:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    warning:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

// ─── Availability Toggle ──────────────────────────────────────────────────────
const AvailabilityToggle = ({ dish, onToggle, loading }) => (
  <button
    onClick={() => onToggle(dish)}
    disabled={loading}
    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
      transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF5C00] focus:ring-offset-2 dark:focus:ring-offset-[#16191D]
      ${dish.isAvailable ? "bg-[#FF5C00]" : "bg-slate-200 dark:bg-white/10"}
      ${loading ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm
        transform transition-transform duration-200 ease-in-out
        ${dish.isAvailable ? "translate-x-4" : "translate-x-0"}
      `}
    />
  </button>
);

// ─── Dish Card ────────────────────────────────────────────────────────────────
const DishCard = ({ dish, onToggle, togglingId, view, onEdit }) => {
  const isLoading = togglingId === dish._id;

  if (view === "list") {
    return (
      <div
        className={`flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-white dark:bg-[#1A1D21] transition-opacity ${!dish.isAvailable && "opacity-75"}`}
      >
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 dark:bg-white/5 flex-shrink-0">
          {dish.image ? (
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <BiSolidDish size={20} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate uppercase tracking-tight">
            {dish.name}
          </h4>
          <p className="text-xs font-medium text-[#FF5C00]">
            RM {Number(dish.price).toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={dish.isAvailable ? "success" : "default"}>
            {dish.isAvailable ? "Live" : "Hidden"}
          </Badge>
          <AvailabilityToggle
            dish={dish}
            onToggle={onToggle}
            loading={isLoading}
          />
          <button
            onClick={() => onEdit(dish)}
            className="p-2 text-slate-400 hover:text-[#FF5C00] transition-colors"
          >
            <BiPencil size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative bg-white dark:bg-[#1A1D21] rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden transition-all hover:shadow-md ${!dish.isAvailable && "opacity-80"}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-white/5 relative">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-200">
            <BiSolidDish size={48} />
          </div>
        )}
        {!dish.isAvailable && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <Badge variant="default">Unavailable</Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase truncate flex-1">
            {dish.name}
          </h4>
          <p className="text-sm font-black text-[#FF5C00] ml-2">
            RM{Number(dish.price).toFixed(0)}
          </p>
        </div>
        <p className="text-[11px] text-slate-500 line-clamp-2 mb-4 h-8 leading-relaxed">
          {dish.description || "No description provided."}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-white/5">
          <AvailabilityToggle
            dish={dish}
            onToggle={onToggle}
            loading={isLoading}
          />
          <button
            onClick={() => onEdit(dish)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-[#FF5C00] hover:text-white transition-all"
          >
            <BiPencil size={14} /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Dishes = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingDish, setEditingDish] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, dishRes] = await Promise.all([getCategory(), getDish()]);
        setCategories(catRes.data?.data || []);
        setDishes(dishRes.data?.data || []);
      } catch (err) {
        console.error("Data fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggle = async (dish) => {
    setTogglingId(dish._id);
    try {
      await api.put(`/api/dish/${dish._id}`, {
        isAvailable: !dish.isAvailable,
      });
      setDishes((prev) =>
        prev.map((d) =>
          d._id === dish._id ? { ...d, isAvailable: !d.isAvailable } : d,
        ),
      );
    } finally {
      setTogglingId(null);
    }
  };

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setFormData({ ...dish });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/dish/${editingDish._id}`, formData);
      setDishes((prev) =>
        prev.map((d) =>
          d._id === editingDish._id ? { ...d, ...formData } : d,
        ),
      );
      setEditingDish(null);
    } catch (err) {
      alert("Failed to update");
    }
  };

  // ─── Filter Logic ──────────────────────────────────────────────────────────
  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const dishCatId = dish.category?._id || dish.category;
    const matchesCategory =
      selectedCategory === "all" || dishCatId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-8 h-8 border-4 border-[#FF5C00]/20 border-t-[#FF5C00] rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Loading Menu
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Enhanced Toolbar */}
      <div className="sticky top-0 z-30 pt-4 pb-2 bg-[#F8FAFC]/80 dark:bg-[#0F1114]/80 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <div className="relative w-full md:max-w-md group">
            <BiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF5C00] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for a dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white dark:bg-[#1A1D21] border border-slate-200 dark:border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 transition-all shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <MdClose size={18} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-2xl border border-white dark:border-white/5">
            {[
              { id: "grid", icon: HiOutlineViewGrid },
              { id: "list", icon: HiOutlineViewList },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setView(t.id)}
                className={`p-2 rounded-xl transition-all ${view === t.id ? "bg-white dark:bg-[#25292E] text-[#FF5C00] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                <t.icon size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
              selectedCategory === "all"
                ? "bg-[#FF5C00] border-[#FF5C00] text-white shadow-lg shadow-[#FF5C00]/20"
                : "bg-white dark:bg-[#1A1D21] border-slate-200 dark:border-white/5 text-slate-500 hover:border-[#FF5C00]/50"
            }`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
                selectedCategory === cat._id
                  ? "bg-[#FF5C00] border-[#FF5C00] text-white shadow-lg shadow-[#FF5C00]/20"
                  : "bg-white dark:bg-[#1A1D21] border-slate-200 dark:border-white/5 text-slate-500 hover:border-[#FF5C00]/50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {/* Categories Loop */}
        {categories
          .filter(
            (cat) => selectedCategory === "all" || cat._id === selectedCategory,
          )
          .map((cat) => {
            const catDishes = filteredDishes.filter(
              (d) => (d.category?._id || d.category) === cat._id,
            );

            if (catDishes.length === 0) return null;

            return (
              <section key={cat._id} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
                    {cat.name}
                  </h2>
                  <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
                  <Badge>{catDishes.length} Items</Badge>
                </div>

                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5"
                      : "max-w-3xl space-y-3"
                  }
                >
                  {catDishes.map((dish) => (
                    <DishCard
                      key={dish._id}
                      dish={dish}
                      onToggle={handleToggle}
                      togglingId={togglingId}
                      view={view}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              </section>
            );
          })}

        {/* Empty State */}
        {filteredDishes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <MdFilterListOff size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No dishes found
            </h3>
            <p className="text-sm text-slate-500 max-w-xs mt-1">
              Try adjusting your search or category filter to find what you're
              looking for.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="mt-6 text-xs font-bold text-[#FF5C00] uppercase tracking-widest hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingDish && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setEditingDish(null)}
          />
          <div className="relative bg-white dark:bg-[#1A1D21] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10">
            <div className="p-6 border-b border-slate-50 dark:border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">
                  Edit Dish
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                  Dish ID: {editingDish._id.slice(-6)}
                </p>
              </div>
              <button
                onClick={() => setEditingDish(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
                    Dish Name
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#FF5C00]"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
                    Price (RM)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#FF5C00]"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
                    Prep Time (Min)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#FF5C00]"
                    value={formData.preparationTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preparationTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#FF5C00] resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
                  Image URL
                </label>
                <input
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#FF5C00]"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-white/5 flex gap-3">
              <button
                onClick={() => setEditingDish(null)}
                className="flex-1 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-[2] py-3 bg-[#FF5C00] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#FF5C00]/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dishes;
