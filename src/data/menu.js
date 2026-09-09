import dosa from "@/assets/food-dosa.jpg";
import biryani from "@/assets/food-biryani.jpg";
import idli from "@/assets/food-idli.jpg";
import tea from "@/assets/food-tea.jpg";
import samosa from "@/assets/food-samosa.jpg";
import lassi from "@/assets/food-lassi.jpg";
export const CATEGORIES = ["Biryani", "Tiffin", "Dosa", "Drinks", "Snacks"];
export const initialCategories = [
    { id: "c_biryani", name: "Biryani", image: biryani, order: 1 },
    { id: "c_tiffin", name: "Tiffin", image: idli, order: 2 },
    { id: "c_dosa", name: "Dosa", image: dosa, order: 3 },
    { id: "c_drinks", name: "Drinks", image: lassi, order: 4 },
    { id: "c_snacks", name: "Snacks", image: samosa, order: 5 },
];
export const initialMenu = [
    { id: "b1", name: "Chicken Biryani", category: "Biryani", price: 180, image: biryani, available: true, description: "Aromatic basmati rice with tender chicken." },
    { id: "b2", name: "Veg Biryani", category: "Biryani", price: 140, image: biryani, available: true, description: "Fragrant rice with mixed vegetables." },
    { id: "b3", name: "Mutton Biryani", category: "Biryani", price: 240, image: biryani, available: false, description: "Slow-cooked mutton dum biryani." },
    { id: "t1", name: "Idli (4 pcs)", category: "Tiffin", price: 60, image: idli, available: true, description: "Soft steamed rice cakes with sambar & chutney." },
    { id: "t2", name: "Vada Sambar", category: "Tiffin", price: 50, image: idli, available: true, description: "Crispy lentil donuts in sambar." },
    { id: "t3", name: "Pongal", category: "Tiffin", price: 70, image: idli, available: true, description: "Comforting rice & lentil porridge." },
    { id: "d1", name: "Masala Dosa", category: "Dosa", price: 90, image: dosa, available: true, description: "Crispy dosa with spicy potato filling." },
    { id: "d2", name: "Plain Dosa", category: "Dosa", price: 70, image: dosa, available: true, description: "Classic crispy rice crepe." },
    { id: "d3", name: "Onion Dosa", category: "Dosa", price: 95, image: dosa, available: true, description: "Dosa topped with caramelized onions." },
    { id: "d4", name: "Cheese Dosa", category: "Dosa", price: 120, image: dosa, available: true, description: "Loaded with melted cheese." },
    { id: "dr1", name: "Masala Chai", category: "Drinks", price: 25, image: tea, available: true, description: "Spiced milk tea." },
    { id: "dr2", name: "Mango Lassi", category: "Drinks", price: 60, image: lassi, available: true, description: "Chilled mango yogurt drink." },
    { id: "dr3", name: "Filter Coffee", category: "Drinks", price: 35, image: tea, available: true, description: "South Indian filter coffee." },
    { id: "s1", name: "Samosa (2 pcs)", category: "Snacks", price: 40, image: samosa, available: true, description: "Crispy fried pastry with potato filling." },
    { id: "s2", name: "Veg Puff", category: "Snacks", price: 30, image: samosa, available: true, description: "Flaky pastry with veg masala." },
];
