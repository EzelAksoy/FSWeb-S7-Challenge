const fastFood = [
  {
    name: "Burger King",
    img:
      "https://www.campaigntr.com/wp-content/uploads/2021/01/1610089529_BK_Logo.png",
    ratings: "4.7/5",
    category: "Burger",
    deliveryTime: "30-35 minutes",
  },
  {
    name: "Pizza Hut",
    img:
      "data:image/jpeg;base64,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",
    ratings: "4.7/5",
    category: "Pizza-Pasta",
    deliveryTime: "40-45 minutes",
  },
  {
    name: "McDonalds",
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBjW95BSpS_eHmfT7mfx85U7mLTbHHymxM4VdciUE3RrlwA2nTVAp5pshfiJ53od47Fhc&usqp=CAU",
    ratings: "4.8/5",
    category: "Burger",
    deliveryTime: "25-30 minutes",
  },
  {
    name: "Dominos",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/200px-Domino%27s_pizza_logo.svg.png",
    ratings: "4.8/5",
    category: "Pizza-Pasta",
    deliveryTime: "25-30 minutes",
  },
  {
    name: "POPEYES",
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgIpKjH_MJ2AzYNL1BErveqhBayVVYEoC9eZP6nZoiHieuroUf4DKzBIk2Z-shWYvmVok&usqp=CAU",
    ratings: "4.5/5",
    category: "Fries Chicken",
    deliveryTime: "25-30 minutes",
  },
  {
    name: "KFC",
    img:
      "https://upload.wikimedia.org/wikipedia/tr/a/a5/Kentucky_Fried_Chicken_logo.svg",
    ratings: "4.8/5",
    category: "Fries Chicken",
    deliveryTime: "30-35 minutes",
  },
];

export default fastFood;
