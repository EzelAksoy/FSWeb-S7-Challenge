import React, { useState, useEffect } from "react";
import "./Order.css";
import styled from "styled-components";
import * as Yup from "yup";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import axios from "axios";

function Order() {
  const [form, setForm] = useState({
    size: "---",
    sauce: false,
    Add_toppings: [],
    Choice_of_substitute: false,
    Special_instructions: "",
    number: 0,
  });
  function HandleChange(event) {
    if (event.target.type === "radio") {
      setForm({ ...form, sauce: event.target.id });
      kayıtValidasyon("sauce", event.target.id);
    }
    if (event.target.name === "Add_toppings") {
      console.log(event.target.checked);
      if (event.target.checked) {
        setForm({
          ...form,
          Add_toppings: [...form.Add_toppings, event.target.id],
        });
        kayıtValidasyon("Add_toppings", [
          ...form.Add_toppings,
          event.target.id,
        ]);
      } else {
        setForm({
          ...form,
          Add_toppings: [
            ...form.Add_toppings.filter((item) => item !== event.target.id),
          ],
        });
        kayıtValidasyon("Add_toppings", [
          ...form.Add_toppings.filter((item) => item !== event.target.id),
        ]);
      }
    }
    if (event.target.id === "Choice_of_substitute") {
      setForm({ ...form, Choice_of_substitute: !form.Choice_of_substitute });
    }
    if (event.target.id === "size") {
      setForm({ ...form, size: event.target.value });
      kayıtValidasyon("size", event.target.value);
    }
    if (event.target.type === "text") {
      setForm({ ...form, Special_instructions: event.target.value });
    }
    if (event.target.type === "number") {
      setForm({ ...form, number: event.target.value });
      kayıtValidasyon("number", event.target.value);
    }
  }
  const [error, setError] = useState({
    size: "Please Choose Your Size",
    sauce: "Please Choose Your Sauce",
    Add_toppings: "Please Choose Min. 4 ingreidents",
    number: "Please Choose Min. one Piece",
  });
  const formSchema = Yup.object().shape({
    size: Yup.string().oneOf(
      ["small", "medium", "large", "extra_large"],
      "Please Choose Size"
    ),
    sauce: Yup.string().required("Please Choose Your Sauce"),
    Add_toppings: Yup.array()
      .min(4, "Please Choose Min. 4 ingreidents")
      .max(8, "maximum 8 ingreidents"),
    number: Yup.number().positive("Minumum order one piece"),
  });
  function kayıtValidasyon(key, value) {
    Yup.reach(formSchema, key)

      .validate(value)

      .then((valid) => {
        setError({
          ...error,
          [key]: "",
        });
      })

      .catch((err) => {
        setError({
          ...error,
          [key]: err.errors[0],
        });
      });
  }
  const [gönderAktif, setGönderAktif] = useState(false);
  useEffect(() => {
    formSchema.isValid(form).then((valid) => {
      setGönderAktif(valid);
    });
  }, [form]);

  function HandleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/orders", form)
      .then((response) => {
        setRegister(response.data);
        setForm({
          size: "",
          sauce: false,
          Add_toppings: [],
          Choice_of_substitute: false,
          Special_instructions: "",
          number: 0,
        });
        setTimeout(() => setRegister(null), 4000);
      })
      .catch((error) => {
        console.log("error bulundu.");
      });
  }
  const [register, setRegister] = useState(null);
  return register ? (
    <div className="basarılı">
      <p>{register.id} Nolu Sipariş Başarılı İle Kayıt Alındı.</p>
      <img src="https://cdn.yemek.com/mnresize/1250/833/uploads/2015/01/sucuklu-pizza-yeni-onecikan.jpg" />
    </div>
  ) : (
    <div>
      <div className="order_header">
        <img src="https://media.istockphoto.com/id/184996591/tr/foto%C4%9Fraf/greek-pizza.jpg?s=612x612&w=0&k=20&c=_x1kSEKiI7L28wZslzDSDhdUniLpWXLz1LlnWalwrQE=" />
        <h4>Build Your Own Pizza</h4>
      </div>

      <form onSubmit={HandleSubmit}>
        <label htmlFor="size" className="main_label">
          {" "}
          Choice of Size
        </label>
        {error.size ? <p className="Error">"{error.size}"</p> : null}
        <div className="size_div">
          <select id="size" onChange={HandleChange}>
            <option value="null">---</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extra_large">Extra Large</option>
          </select>
        </div>
        <label className="main_label">Choice of Sauce</label>
        {error.sauce ? <p className="Error">"{error.sauce}"</p> : null}
        <div className="sauce_div">
          <input
            id="original_red"
            type="radio"
            checked={form.sauce === "original_red"}
            value={form.sauce}
            onClick={HandleChange}
            name="Sauce"
          />
          <label htmlFor="original_red" data-cy="testyeri">
            Original Red
          </label>
          <br />
          <input
            id="garlic_ranch"
            type="radio"
            checked={form.sauce === "garlic_ranch"}
            value={form.sauce}
            onClick={HandleChange}
            name="Sauce"
          />
          <label htmlFor="garlic_ranch">Garlic Ranch</label>
          <br />
          <input
            id="BBQ_sauce"
            type="radio"
            checked={form.sauce === "BBQ_sauce"}
            value={form.sauce}
            onClick={HandleChange}
            name="Sauce"
          />
          <label htmlFor="BBQ_sauce">BBQ Sauce</label>
          <br />
          <input
            id="Spranch_alfredo"
            type="radio"
            checked={form.sauce === "Spranch_alfredo"}
            value={form.sauce}
            onClick={HandleChange}
            name="Sauce"
          />
          <label htmlFor="Spranch_alfredo">Spinach Alfredo</label>
        </div>
        <label className="main_label">Add Toppings</label>
        {error.Add_toppings ? <p>"{error.Add_toppings}"</p> : null}
        <div className="Add_toppings_div">
          <input
            type="checkbox"
            id="Mushrooms"
            checked={form.Add_toppings.includes("Mushrooms")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Mushrooms">Mushrooms</label>
          <input
            type="checkbox"
            id="Pepperoni"
            checked={form.Add_toppings.includes("Pepperoni")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Pepperoni">Pepperoni</label>
          <input
            type="checkbox"
            id="Diced_Tomatos"
            checked={form.Add_toppings.includes("Diced_Tomatos")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Diced_Tomatos">Diced Tomatos</label>

          <input
            type="checkbox"
            id="Sausage"
            checked={form.Add_toppings.includes("Sausage")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Sausage">Sausage</label>
          <input
            type="checkbox"
            id="Black_Olives"
            checked={form.Add_toppings.includes("Black_Olives")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Black_Olives">Black Olives</label>

          <input
            type="checkbox"
            id="Canadian_Bacon"
            checked={form.Add_toppings.includes("Canadian_Bacon")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Canadian_Bacon">Canadian Bacon</label>
          <input
            type="checkbox"
            id="Roasted_Garlic"
            checked={form.Add_toppings.includes("Roasted_Garlic")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Roasted_Garlic">Roasted Garlic</label>

          <input
            type="checkbox"
            id="Spicy_italian_Sausage"
            checked={form.Add_toppings.includes("Spicy_italian_Sausage")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Spicy_italian_Sausage">Spicy italian Sausage</label>
          <input
            type="checkbox"
            id="Artichoke_Hearts"
            checked={form.Add_toppings.includes("Artichoke_Hearts")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Artichoke_Hearts">Artichoke Hearts</label>

          <input
            type="checkbox"
            id="Grilled_Chicken"
            checked={form.Add_toppings.includes("Grilled_Chicken")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Grilled_Chicken">Grilled Chicken</label>
          <input
            type="checkbox"
            id="Three_Cheese"
            checked={form.Add_toppings.includes("Three_Cheese")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Three_Cheese">Three Cheese</label>

          <input
            type="checkbox"
            id="Onions"
            checked={form.Add_toppings.includes("Onions")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Onions">Onions</label>
          <input
            type="checkbox"
            id="Pineapple"
            checked={form.Add_toppings.includes("Pineapple")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Pineapple">Pineapple</label>

          <input
            type="checkbox"
            id="Green_Pepper"
            checked={form.Add_toppings.includes("Green_Pepper")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Green_Pepper">Green Pepper</label>
          <input
            type="checkbox"
            id="Extra_Cheese"
            checked={form.Add_toppings.includes("Extra_Cheese")}
            name="Add_toppings"
            onClick={HandleChange}
          />
          <label htmlFor="Extra_Cheese">Extra Cheese</label>
        </div>
        <label className="main_label">Choice of Substitute</label>
        <div className="substitue_div">
          <input
            id="Choice_of_substitute"
            type="checkbox"
            checked={form.Choice_of_substitute}
            onClick={HandleChange}
          />
          <label htmlFor="Choice_of_substitute">Gluten Free Crust</label>
        </div>
        <label className="main_label">Special Instructions</label>
        <div className="special_div">
          {" "}
          <input
            type="text"
            placeholder="Anything else you'd like to add?"
            value={form.Special_instructions}
            onChange={HandleChange}
          />
        </div>
        <label className="main_label" htmlFor="number">
          {" "}
          Choice of Numbers
        </label>
        <div className="number_div">
          {error.number ? <p className="Error">"{error.number}"</p> : null}
          <input
            id="number"
            type="number"
            value={form.number}
            onChange={HandleChange}
            min="1"
          />
        </div>

        <input className="Gönder" type="submit" disabled={!gönderAktif} />
      </form>
    </div>
  );
}

export default Order;
