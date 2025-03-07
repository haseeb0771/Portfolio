import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Haseeb Tariq",
          from_email: form.email,
          to_email: "haseebtariq7866@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };
  const handleMailClick = () => {
    window.location.href = "mailto:haseebtariq7866@gmail.com";
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">My Gmail :</span>
            <a
              target="_blank"
              onClick={handleMailClick}
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-full text-center text-white font-bold shadow-md shadow-primary"
            >
              Click to mail
            </a>
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">My LinkedIn :</span>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/haseeb-tariq-9248232a1/"
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-full text-center text-white font-bold shadow-md shadow-primary"
            >
              Go To LinkedIn
            </a>
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">My What'sApp :</span>
            <a
              target="_blank"
              href="https://wa.me/+923335626608"
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-full text-center text-white font-bold shadow-md shadow-primary"
            >
              Click To Chat
            </a>
          </label>
          <p
            className={styles.sectionSubText}
            style={{ marginTop: "15px", color: "white" }}
          >
            Thank you for your valuable time.
          </p>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
