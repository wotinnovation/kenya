"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useContextElement } from "@/context/Context";
import { useCreateContactMutation } from "@/graphql/generated";

const initialForm = { name: "", email: "", phone: "" };

export default function RequestQuote() {
  const { quoteProduct } = useContextElement();
  const [createContact] = useCreateContactMutation();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (quoteProduct) {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}/product/${quoteProduct.slug}`
          : `/product/${quoteProduct.slug}`;
      setMessage(`I would like a quote for: ${quoteProduct.name}\n${url}`);
    }
  }, [quoteProduct]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createContact({
        variables: {
          input: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            subject: `Quote request: ${quoteProduct?.name || "Product"}`,
            message,
          },
        },
      });
      toast.success("Quote request sent. We'll get back to you soon.");
      setForm(initialForm);
      const bootstrap = require("bootstrap");
      const modalEl = document.getElementById("requestQuote");
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    } catch (error) {
      toast.error("Could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modalCentered fade modal-log" id="requestQuote">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon icon-close btn-hide-popup"
            data-bs-dismiss="modal"
          />
          <div className="modal-log-wrap list-file-delete">
            <h5 className="title fw-semibold">Request a Quote</h5>
            {quoteProduct && (
              <p className="body-text-3 mb-2">For: {quoteProduct.name}</p>
            )}
            <form onSubmit={handleSubmit} className="form-log">
              <div className="form-content">
                <fieldset>
                  <label className="fw-semibold body-md-2"> Name * </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="fw-semibold body-md-2"> Email * </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="fw-semibold body-md-2"> Phone * </label>
                  <input
                    type="text"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="fw-semibold body-md-2"> Message * </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ width: "100%" }}
                  />
                </fieldset>
              </div>
              <button
                type="submit"
                className="tf-btn w-100 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
