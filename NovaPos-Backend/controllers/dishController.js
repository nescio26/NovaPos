const Dish = require("../models/Dish");
const Category = require("../models/Category");

//     Create a new dish
exports.createDish = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      image,
      isAvailable,
      preparationTime,
      ingredients,
      isPopular,
    } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Category does not exist.",
      });
    }

    // Check if dish name already exists
    const existingDish = await Dish.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      category,
    });

    if (existingDish) {
      return res.status(400).json({
        success: false,
        message: "Dish with this name already exists in this category",
      });
    }

    const dish = await Dish.create({
      name: name.trim(),
      price,
      category,
      description: description || "",
      image: image || "",
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      preparationTime: preparationTime || 15,
      ingredients: ingredients || [],
      isPopular: isPopular || false,
    });

    await dish.populate("category", "name");

    res.status(201).json({
      success: true,
      data: dish,
      message: "Dish created successfully",
    });
  } catch (error) {
    console.error("Create dish error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create dish",
    });
  }
};

//     Get all dishes
exports.getDishes = async (req, res) => {
  try {
    const { category, isAvailable, search } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === "true";
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const dishes = await Dish.find(query)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dishes.length,
      data: dishes,
    });
  } catch (error) {
    console.error("Get dishes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dishes",
    });
  }
};

//     Get single dish
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).populate(
      "category",
      "name description",
    );

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    res.status(200).json({
      success: true,
      data: dish,
    });
  } catch (error) {
    console.error("Get dish error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dish",
    });
  }
};

//     Update dish
exports.updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true },
    ).populate("category", "name");

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    res.status(200).json({
      success: true,
      data: dish,
      message: "Dish updated successfully",
    });
  } catch (error) {
    console.error("Update dish error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update dish",
    });
  }
};

//     Delete dish
exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    await dish.deleteOne();

    res.status(200).json({
      success: true,
      message: "Dish deleted successfully",
    });
  } catch (error) {
    console.error("Delete dish error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete dish",
    });
  }
};

//     Toggle dish availability
exports.toggleDishAvailability = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    dish.isAvailable = !dish.isAvailable;
    await dish.save();

    res.status(200).json({
      success: true,
      data: dish,
      message: `Dish is now ${dish.isAvailable ? "available" : "unavailable"}`,
    });
  } catch (error) {
    console.error("Toggle availability error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update availability",
    });
  }
};
