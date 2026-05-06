"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

export default function EditCustomOrderPage() {

  const { id } = useParams();
  const router = useRouter();

  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const [popup,setPopup] = useState(false);

  const [customerName,setCustomerName] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [note,setNote] = useState("");

  const [items,setItems] = useState([]);

  /*
  FETCH ORDER
  */

  useEffect(()=>{

    const fetchOrder = async()=>{

      const res = await fetch(`/api/admin/orders/single?id=${id}`);
      const data = await res.json();

      setCustomerName(data.customerName || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
      setNote(data.note || "");

      setItems(
        data.items?.length
          ? data.items
          : [
              {
                title:"",
                qty:1,
                price:0
              }
            ]
      );

      setLoading(false);

    };

    fetchOrder();

  },[id]);


  /*
  TOTAL
  */

  const totalAmount = useMemo(()=>{

    return items.reduce((acc,item)=>{

      return acc + (
        Number(item.qty || 0) *
        Number(item.price || 0)
      );

    },0);

  },[items]);


  /*
  UPDATE ITEM
  */

  const updateItem = (index,key,value)=>{

    const updated = [...items];

    updated[index][key] = value;

    setItems(updated);

  };


  /*
  ADD ITEM
  */

  const addItem = ()=>{

    setItems(prev=>[
      ...prev,
      {
        title:"",
        qty:1,
        price:0
      }
    ]);

  };


  /*
  REMOVE ITEM
  */

  const removeItem = (index)=>{

    const updated = [...items];

    updated.splice(index,1);

    setItems(updated);

  };


  /*
  SAVE
  */

  const handleSave = async()=>{

    setSaving(true);

    await fetch("/api/admin/orders/update",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id,
        customerName,
        phone,
        address,
        note,
        items,
        totalAmount
      })
    });

    setSaving(false);

    router.push("/admin/orders?tab=new");

  };


  if(loading){
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading order...
      </div>
    );
  }


  return (

    <div className="max-w-3xl mx-auto space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-xl font-semibold">
          Edit Custom Order
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Finalize custom order pricing and items
        </p>

      </div>


      {/* CUSTOMER */}

      <div className="bg-white rounded-2xl border p-4 space-y-4">

        <input
          value={customerName}
          onChange={(e)=>setCustomerName(e.target.value)}
          placeholder="Customer Name"
          className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
        />

        <input
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
        />

        <textarea
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          placeholder="Address"
          rows={3}
          className="w-full border rounded-xl px-4 py-3 text-sm outline-none resize-none"
        />

        <textarea
          value={note}
          onChange={(e)=>setNote(e.target.value)}
          placeholder="Note"
          rows={2}
          className="w-full border rounded-xl px-4 py-3 text-sm outline-none resize-none"
        />

      </div>


      {/* ITEMS */}

      <div className="space-y-4">

        {items.map((item,index)=>(

          <div
            key={index}
            className="bg-white border rounded-2xl p-4 space-y-3"
          >

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium">
                Item {index + 1}
              </p>

              {items.length > 1 && (

                <button
                  onClick={()=>removeItem(index)}
                  className="text-red-500"
                >
                  <Trash2 size={16}/>
                </button>

              )}

            </div>


            <input
              value={item.title}
              onChange={(e)=>
                updateItem(index,"title",e.target.value)
              }
              placeholder="Item Name"
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
            />


            <div className="grid grid-cols-2 gap-3">

              <input
                type="number"
                value={item.qty}
                onChange={(e)=>
                  updateItem(index,"qty",e.target.value)
                }
                placeholder="Qty"
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
              />

              <input
                type="number"
                value={item.price}
                onChange={(e)=>
                  updateItem(index,"price",e.target.value)
                }
                placeholder="Price"
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
              />

            </div>

          </div>

        ))}

      </div>


      {/* ADD ITEM */}

      <button
        onClick={addItem}
        className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-4 py-3 rounded-xl"
      >
        <Plus size={16}/>
        Add Item
      </button>


      {/* TOTAL */}

      <div className="bg-[var(--primary)] text-white rounded-2xl p-5 flex items-center justify-between">

        <div>

          <p className="text-sm opacity-80">
            Final Total
          </p>

          <h2 className="text-2xl font-bold">
            ₹ {totalAmount}
          </h2>

        </div>

      </div>


      {/* SAVE */}

      <button
        onClick={()=>setPopup(true)}
        disabled={saving}
        className="w-full bg-[var(--primary)] text-white py-4 rounded-2xl font-medium shadow-lg"
      >
        {saving ? "Updating..." : "Update Order"}
      </button>



      {/* POPUP */}

      <AnimatePresence>

        {popup && (

          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
          >

            <motion.div
              initial={{scale:0.9,opacity:0}}
              animate={{scale:1,opacity:1}}
              exit={{scale:0.9,opacity:0}}
              className="bg-white rounded-3xl p-6 w-full max-w-md space-y-5"
            >

              <div className="space-y-2 text-center">

                <h2 className="text-lg font-semibold">
                  Confirm Final Update
                </h2>

                <p className="text-sm text-gray-500">
                  Updated Total:
                </p>

                <p className="text-3xl font-bold text-[var(--primary)]">
                  ₹ {totalAmount}
                </p>

                <p className="text-xs text-red-500 mt-2">
                  You can't edit this order again.
                  Need changes? Contact developer 😎
                </p>

              </div>


              <div className="flex gap-3">

                <button
                  onClick={handleSave}
                  className="flex-1 bg-[var(--primary)] text-white py-3 rounded-xl"
                >
                  Confirm
                </button>

                <button
                  onClick={()=>setPopup(false)}
                  className="flex-1 bg-gray-100 py-3 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

}