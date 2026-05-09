"use client";

import { useEffect, useState } from "react";

import {
  X,
  Upload,
  CheckCircle2,
  Package,
  IndianRupee,
  ImageIcon,
  Sparkles,
  Truck,
  Star,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {

  /*
  EMPTY FORM
  */

  const emptyForm = {
    name: "",
    description: "",
    sellingPrice: "",
    category: "",
    isFeatured: false,
    isVisible: true,

    /*
    OPTIONAL COMMERCE FIELDS
    */

    badgeText: "",
    offerText: "",
    deliveryInfo: "",
  };

  const [form, setForm] = useState(emptyForm);

  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState("");

  const [uploading, setUploading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  /*
  FETCH CATEGORIES
  */

  useEffect(() => {
    fetch("/api/categories/dropdown")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  /*
  IMAGE UPLOAD
  */

  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    const fd = new FormData();

    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (data?.url) {
      setImage(data.url);
    }

    setUploading(false);
  };

  /*
  REMOVE IMAGE
  */

  const removeImage = () => {
    setImage("");
  };

  /*
  SUBMIT
  */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name || !form.sellingPrice || !form.category) {
      alert("Fill all required fields");
      return;
    }

    await fetch("/api/products/create", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...form,
        image,
      }),
    });

    setShowPopup(true);

    setForm(emptyForm);

    setImage("");

    setTimeout(() => {
      setShowPopup(false);
    }, 1500);

    console.log("created product");
  };

  return (

    <div className="min-h-screen bg-[#fffaf5] px-4 py-6 pb-24">

      <div className="max-w-3xl mx-auto space-y-6">

        {/* SUCCESS POPUP */}

        <AnimatePresence>

          {showPopup && (

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            >

              <div className="bg-white rounded-3xl px-6 py-5 shadow-2xl flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">

                  <CheckCircle2
                    size={20}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    Product Added
                  </p>

                  <p className="text-sm text-slate-500">
                    Product successfully created
                  </p>

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        {/* HEADER */}

        <div className="space-y-2">

          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600">

            <Sparkles size={15} />

            BASTA GIFTS ADMIN

          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">

            Add New Product

          </h1>

          <p className="text-sm text-slate-500">

            Create rich marketplace-style product listings for your storefront.

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-[32px] border border-orange-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
        >

          {/* PRODUCT INFO */}

          <div className="space-y-5">

            <SectionTitle
              icon={<Package size={18} />}
              title="Product Information"
            />

            <InputField
              label="Product Name"
              placeholder="Enter product name"
              value={form.name}
              onChange={(v) =>
                setForm({ ...form, name: v })
              }
            />

            <TextAreaField
              label="Description"
              placeholder="Write short product description"
              value={form.description}
              onChange={(v) =>
                setForm({
                  ...form,
                  description: v,
                })
              }
            />

          </div>

          {/* PRICING */}

          <div className="space-y-5">

            <SectionTitle
              icon={<IndianRupee size={18} />}
              title="Pricing & Category"
            />

            <InputField
              label="Selling Price"
              type="number"
              placeholder="Enter product price"
              value={form.sellingPrice}
              onChange={(v) =>
                setForm({
                  ...form,
                  sellingPrice: Number(v),
                })
              }
            />

            <div className="space-y-2">

              <label className="text-sm font-medium text-slate-700">
                Product Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              >

                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (

                  <option
                    key={cat._id}
                    value={cat._id}
                  >

                    {cat.name}

                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* MEDIA */}

          <div className="space-y-5">

            <SectionTitle
              icon={<ImageIcon size={18} />}
              title="Product Media"
            />

            <label className="border-2 border-dashed border-orange-200 rounded-3xl bg-orange-50/40 p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-orange-50 transition-all">

              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">

                <Upload
                  size={22}
                  className="text-orange-500"
                />

              </div>

              <div>

                <p className="font-medium text-slate-700">
                  Upload Product Image
                </p>

                <p className="text-sm text-slate-500">
                  JPG, PNG or WEBP supported
                </p>

              </div>

              <input
                type="file"
                hidden
                onChange={handleUpload}
              />

            </label>

            {uploading && (

              <p className="text-sm text-orange-500 font-medium">

                Uploading image...

              </p>

            )}

            {image && (

              <div className="relative w-32">

                <img
                  src={image}
                  alt="product"
                  className="w-32 h-32 object-cover rounded-2xl border border-orange-100"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
                >

                  <X size={14} />

                </button>

              </div>

            )}

          </div>

          {/* COMMERCE */}

          <div className="space-y-5">

            <SectionTitle
              icon={<Truck size={18} />}
              title="Commerce Settings"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <InputField
                label="Badge Text"
                placeholder="Best Seller"
                value={form.badgeText}
                onChange={(v) =>
                  setForm({
                    ...form,
                    badgeText: v,
                  })
                }
              />

              <InputField
                label="Offer Text"
                placeholder="10% OFF"
                value={form.offerText}
                onChange={(v) =>
                  setForm({
                    ...form,
                    offerText: v,
                  })
                }
              />

            </div>

            <InputField
              label="Delivery Information"
              placeholder="Delivery in 2-4 days"
              value={form.deliveryInfo}
              onChange={(v) =>
                setForm({
                  ...form,
                  deliveryInfo: v,
                })
              }
            />

          </div>

          {/* VISIBILITY */}

          <div className="space-y-5">

            <SectionTitle
              icon={<Star size={18} />}
              title="Visibility Settings"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 cursor-pointer">

                <div>

                  <p className="font-medium text-slate-800">
                    Featured Product
                  </p>

                  <p className="text-sm text-slate-500">
                    Highlight product on homepage
                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isFeatured:
                        e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-orange-500"
                />

              </label>

              <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 cursor-pointer">

                <div>

                  <p className="font-medium text-slate-800">
                    Product Visible
                  </p>

                  <p className="text-sm text-slate-500">
                    Show product in storefront
                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={form.isVisible}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isVisible:
                        e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-orange-500"
                />

              </label>

            </div>

          </div>

          {/* SUBMIT */}

          <button
            className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold shadow-lg shadow-orange-200"
          >

            Save Product

          </button>

        </form>

      </div>

    </div>

  );
}

/*
SECTION TITLE
*/

function SectionTitle({ icon, title }) {

  return (

    <div className="flex items-center gap-2">

      <div className="text-orange-500">

        {icon}

      </div>

      <h2 className="font-semibold text-slate-900">

        {title}

      </h2>

    </div>

  );
}

/*
INPUT
*/

function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) {

  return (

    <div className="space-y-2">

      <label className="text-sm font-medium text-slate-700">

        {label}

      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
      />

    </div>

  );
}

/*
TEXTAREA
*/

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
}) {

  return (

    <div className="space-y-2">

      <label className="text-sm font-medium text-slate-700">

        {label}

      </label>

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all resize-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
      />

    </div>

  );
}