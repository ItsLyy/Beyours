import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { forwardRef, useRef, useState, useImperativeHandle, useEffect } from "react";
import { useForm, Head, Link, usePage, router, createInertiaApp } from "@inertiajs/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DatePicker from "react-datepicker";
import { createPortal } from "react-dom";
import { Font, StyleSheet, PDFViewer, Document, Page, View, Image, Text } from "@react-pdf/renderer";
import { Transition, Dialog as Dialog$1, TransitionChild, DialogPanel } from "@headlessui/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function DialogBody({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "px-6 py-4 sm:px-12 sm:py-8 h-full", children });
}
function DialogFooter({ footerContent }) {
  return /* @__PURE__ */ jsx("div", { className: "border-t-[.5px] border-t-beyours-600 py-6 px-12", children: footerContent });
}
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsxs("svg", { ...props, viewBox: "0 0 155 130", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        className: "fill-[#7A1CAC]",
        d: "M694.74,241.17l-45.56,78.94A11.76,11.76,0,0,1,639,326H598.79a6.4,6.4,0,0,1-5.55-9.6l70.32-121.8a6.41,6.41,0,0,1,11.09,0l20.09,34.81A11.72,11.72,0,0,1,694.74,241.17Z",
        transform: "translate(-592.38 -191.4)"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        className: "fill-[#9D49E1]",
        d: "M720.29,276.37l-27.88,48.27a2.71,2.71,0,0,1-2.35,1.36H656.28a3.42,3.42,0,0,1-3-5.13l44.15-76.48a3.42,3.42,0,0,1,5.92,0l16.9,29.26A2.75,2.75,0,0,1,720.29,276.37Z",
        transform: "translate(-592.38 -191.4)"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        className: "fill-[#AD49E1]",
        d: "M739.14,326H697.22a1.28,1.28,0,0,1-1.11-1.92l25.64-44.18a1.28,1.28,0,0,1,2.21,0l21,36.13A6.65,6.65,0,0,1,739.14,326Z",
        transform: "translate(-592.38 -191.4)"
      }
    )
  ] });
}
function DialogHeader({ title }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-6 px-12 text-[#ffff] border-b-[.5px] border-b-beyours-600", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl leading-loose align-middle", children: title }),
    /* @__PURE__ */ jsx(ApplicationLogo, { className: "size-8" })
  ] });
}
function Dialog({
  title,
  className,
  useFooter,
  children,
  footerContent
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "w-full rounded-sm overflow-hidden bg-beyours-700 shadow-md sm:max-w-md sm:rounded-md " + className,
      children: [
        /* @__PURE__ */ jsx(DialogHeader, { title }),
        /* @__PURE__ */ jsx(DialogBody, { children }),
        useFooter ? /* @__PURE__ */ jsx(DialogFooter, { footerContent }) : ""
      ]
    }
  );
}
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx(
    "p",
    {
      ...props,
      className: "text-sm text-red-600 " + className,
      children: message
    }
  ) : null;
}
function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      ...props,
      className: `block text-sm font-medium text-inherit  ` + className,
      children: value ? value : children
    }
  );
}
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center justify-center bg-gradient-to-b from-beyours-900 from-0% shadow to-beyours-800 rounded-sm border-0 w-full px-4 py-4 text-xs font-thin uppercase tracking-widest text-[#fff] transition duration-300 ease-in-out hover:shadow-beyours-1000 hover:shadow-sm focus:shadow-beyours-1000 focus:shadow-sm focus:outline-none focus:ring-beyours-800 active:shadow-md active:shadow-beyours-1000 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, Icon, name, ...props }, ref) {
  var _a;
  const localRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a2;
      return (_a2 = localRef.current) == null ? void 0 : _a2.focus();
    }
  }));
  useEffect(() => {
    var _a2;
    if (isFocused) {
      (_a2 = localRef.current) == null ? void 0 : _a2.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
    Icon ? /* @__PURE__ */ jsx("div", { className: "absolute left-0 mx-4 s-4 z-10", children: /* @__PURE__ */ jsx("label", { htmlFor: name, children: /* @__PURE__ */ jsx(
      Icon,
      {
        className: isFocus || ((_a = localRef.current) == null ? void 0 : _a.value.length) > 0 ? "stroke-beyours-100" : "stroke-beyours-500"
      }
    ) }) }) : "",
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        type,
        className: (Icon ? "pl-14 " : "") + "text-sm rounded-sm bg-beyours-600 text-[#ffffff] py-4 border-0 shadow-sm transition-all ease-in-out duration-300 placeholder-beyours-450 placeholder:font-geist focus:border-beyours-500 focus:ring-beyours-500 file:absolute file:top-0 file:right-0 file:h-full file:font-geist file:bg-beyours-550 hover:file:bg-beyours-500 file:transition-all file:ease-in-out file:duration-300 file:text-white file:border-0 file:rounded-s-md file:px-4 file:mr-0 " + className,
        ref: localRef,
        onFocus: () => setIsFocus(true),
        onBlur: () => setIsFocus(false)
      }
    )
  ] });
});
function GuestLayout({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-beyours-750 text-beyours-100 pt-6 sm:pt-0", children });
}
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full min-h-screen", children: /* @__PURE__ */ jsxs(Dialog, { title: "Confirm Password", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 text-base text-beyours-100", children: "This is a secure area of the application. Please confirm your password before continuing." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              type: "password",
              name: "password",
              value: data.password,
              className: "mt-1 block w-full",
              isFocused: true,
              onChange: (e) => setData("password", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Confirm" }) })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full min-h-screen", children: /* @__PURE__ */ jsxs(
      Dialog,
      {
        title: "Reset Password",
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 text-base text-beyours-100", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
          status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                name: "email",
                value: data.email,
                className: "mt-1 block w-full",
                isFocused: true,
                onChange: (e) => setData("email", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 mb-10 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Email Password Reset Link" }) })
          ] })
        ]
      }
    ) })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-beyours-500 text-beyours-900 bg-beyours-550 shadow-sm focus:ring-beyours-800 " + className
    }
  );
}
function IconEmail({ className }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-6 " + className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" }) });
}
function IconPassword({ className }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-6 " + className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" }) });
}
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center w-full min-h-screen sm:justify-center", children: /* @__PURE__ */ jsx(
      Dialog,
      {
        title: "Login",
        useFooter: true,
        footerContent: /* @__PURE__ */ jsxs("p", { className: "text-center font-thin text-sm", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-beyours-900", href: route("register"), children: "Signup" })
        ] }),
        children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "text-beyours-500", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                name: "email",
                value: data.email,
                className: "mt-1 block w-full",
                autoComplete: "username",
                placeholder: "Enter you email",
                Icon: IconEmail,
                isFocused: true,
                onChange: (e) => setData("email", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2 text-[#fff]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                name: "password",
                value: data.password,
                className: "mt-1 block w-full",
                placeholder: "Enter you password",
                Icon: IconPassword,
                autoComplete: "current-password",
                onChange: (e) => setData("password", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.password,
                className: "mt-2 text-[#fff]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 mb-14 flex justify-between", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  name: "remember",
                  checked: data.remember,
                  onChange: (e) => setData("remember", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-beyours-250", children: "Remember me" })
            ] }),
            canResetPassword && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("password.request"),
                className: "rounded-sm text-sm text-beyours-250 hover:text-beyours-200 ease-in-out transition-all focus:outline-none focus:ring-2 focus:ring-beyours-800 focus:ring-offset-2",
                children: "Forgot your password?"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 mb-16 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "", disabled: processing, children: "Login" }) }),
          status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status })
        ] })
      }
    ) })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function IconUser({ className }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-6 " + className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" }) });
}
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full min-h-screen", children: /* @__PURE__ */ jsx(
      Dialog,
      {
        title: "Signup",
        useFooter: true,
        footerContent: /* @__PURE__ */ jsxs("p", { className: "text-center font-thin text-sm", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-beyours-900", href: route("login"), children: "Login" })
        ] }),
        children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                name: "name",
                value: data.name,
                className: "mt-1 block w-full",
                autoComplete: "name",
                placeholder: "Enter your username",
                Icon: IconUser,
                isFocused: true,
                onChange: (e) => setData("name", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2 text-[#fff]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                name: "email",
                value: data.email,
                className: "mt-1 block w-full",
                placeholder: "Enter your email",
                Icon: IconEmail,
                autoComplete: "username",
                onChange: (e) => setData("email", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2 text-[#fff]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                name: "password",
                value: data.password,
                className: "mt-1 block w-full",
                placeholder: "Enter your password",
                Icon: IconPassword,
                autoComplete: "new-password",
                onChange: (e) => setData("password", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.password,
                className: "mt-2 text-[#fff]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password_confirmation",
                type: "password",
                name: "password_confirmation",
                value: data.password_confirmation,
                className: "mt-1 block w-full",
                placeholder: "Enter your password confirmation",
                autoComplete: "new-password",
                Icon: IconPassword,
                onChange: (e) => setData("password_confirmation", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.password_confirmation,
                className: "mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-16 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Register" }) })
        ] })
      }
    ) })
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full min-h-screen", children: /* @__PURE__ */ jsx(Dialog, { title: "Reset Password", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            placeholder: "Enter your email",
            Icon: IconEmail,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            placeholder: "Enter you new password",
            isFocused: true,
            Icon: IconPassword,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            id: "password_confirmation",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            Icon: IconPassword,
            placeholder: "Enter you new password confirmation",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 mb-16 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Reset Password" }) })
    ] }) }) })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function BannerCharacter({ className, imagePreview }) {
  const character = usePage().props.auth.character;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "bg-beyours-700 aspect-[12/16] rounded-md overflow-hidden border-b-[1px] border-b-white " + className,
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imagePreview ? URL.createObjectURL(imagePreview) : "/" + ((character == null ? void 0 : character.banner_path) || "images/defaultavatar.png"),
          alt: "Default Avatar",
          className: "h-full w-full object-cover object-center"
        }
      )
    }
  );
}
function HeaderInputField({
  title,
  description,
  className,
  required = false
}) {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-80 " + className, children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-white text-lg", children: [
      title,
      " ",
      required ? /* @__PURE__ */ jsx("span", { className: "text-red-700", children: "*" }) : "",
      " "
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-beyours-150", children: description })
  ] });
}
function PhotoProfile({ className, imagePreview, imageData }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "bg-beyours-700 border-beyours-100 border-[1px] p-[1px] rounded-full overflow-hidden " + className,
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imagePreview ? URL.createObjectURL(imagePreview) : "/" + (imageData || "images/defaultavatar.png"),
          alt: "Default Avatar",
          className: "w-full h-full box-border object-cover object-center shadow-sm rounded-full"
        }
      )
    }
  );
}
function IconLocation({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: [
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }),
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" })
      ]
    }
  );
}
function IconPhone({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        }
      )
    }
  );
}
function IconProfession({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
        }
      )
    }
  );
}
function IconSkill({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
        }
      )
    }
  );
}
function IconPhotoProfile({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        }
      )
    }
  );
}
function IconCharacterBanner({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        }
      )
    }
  );
}
function Create$3() {
  const [photoProfileName, setPhotoProfileName] = useState("");
  const [characterBannerName, setCharacterBannerName] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    fullname: "",
    profession: "",
    first_skill: "",
    second_skill: "",
    phone_number: "",
    address: "",
    photo_profile: "",
    character_banner: ""
  });
  const photoProfileHandler = (e) => {
    setData("photo_profile", e.target.files[0]);
    setPhotoProfileName(e.target.value);
  };
  const characterBannerHandler = (e) => {
    setData("character_banner", e.target.files[0]);
    setCharacterBannerName(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are you sure to want create a character?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        post(route("character.store"));
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-beyours-750 text-beyours-100", children: [
    /* @__PURE__ */ jsx(Head, { title: "Character" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full min-h-screen p-4", children: /* @__PURE__ */ jsx(
      Dialog,
      {
        title: "Create a character",
        useFooter: true,
        className: "md:max-w-none md:w-3/5 md:h-5/6",
        children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("form", { className: "flex gap-4 relative", onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-full flex justify-center mb-10", children: [
            /* @__PURE__ */ jsx(PhotoProfile, { className: "size-20 absolute -bottom-8", imagePreview: data.photo_profile || null }),
            /* @__PURE__ */ jsx(BannerCharacter, { className: "w-96", imagePreview: data.character_banner || null })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full h-full px-2 py-1", children: [
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Full Name", description: "this name will displayed in the community and friend", className: "mb-4", required: true }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "fullname",
                  name: "fullname",
                  value: data.fullname,
                  className: "block w-full",
                  autoComplete: "fullname",
                  placeholder: "Enter your full name",
                  Icon: IconUser,
                  isFocused: true,
                  onChange: (e) => setData("fullname", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.fullname, className: "mt-2 text-[#fff]" })
            ] }),
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Profession", description: "Describe your profession or passion and choose only one. Example: Programmer, Artist, Adventurer.", className: "my-4", required: true }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "profession",
                  type: "text",
                  name: "profession",
                  value: data.profession,
                  className: "block w-full",
                  placeholder: "Enter your profession",
                  Icon: IconProfession,
                  autoComplete: "profession",
                  onChange: (e) => setData("profession", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.profession, className: "mt-2 text-[#fff]" })
            ] }),
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Skills", description: "Add two skills that represent your abilities. Example: Coding, Video Editing, Swordsmanship.", className: "my-4", required: true }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex w-full gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "first_skill",
                    type: "text",
                    name: "first_skill",
                    value: data.first_skill,
                    className: "block w-full",
                    placeholder: "Enter your first skill",
                    Icon: IconSkill,
                    autoComplete: "first_skill",
                    onChange: (e) => setData("first_skill", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.first_skill, className: "mt-2 text-[#fff]" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "second_skill",
                    type: "text",
                    name: "second_skill",
                    value: data.second_skill,
                    className: "block w-full",
                    placeholder: "Enter your second skill",
                    Icon: IconSkill,
                    autoComplete: "second_skill",
                    onChange: (e) => setData("second_skill", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.second_skill, className: "mt-2 text-[#fff]" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Aditional Information", description: 'Required details like "Phone Number: +6282112341234", "Address: 123 Main Street".', className: "my-4", required: true }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex w-full gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "phone_number",
                    type: "tel",
                    name: "phone_number",
                    value: data.phone_number,
                    className: "block w-full",
                    placeholder: "Enter your phone number",
                    Icon: IconPhone,
                    autoComplete: "phone_number",
                    onChange: (e) => setData("phone_number", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.phone_number, className: "mt-2 text-[#fff]" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "address",
                    type: "text",
                    name: "address",
                    value: data.address,
                    className: "block w-full",
                    placeholder: "Enter your address",
                    Icon: IconLocation,
                    autoComplete: "address",
                    onChange: (e) => setData("address", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2 text-[#fff]" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Photo Profile", description: "this photo profile will displayed in the community and friend", className: "my-4", required: true }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "photo_profile",
                  type: "file",
                  name: "photo_profile",
                  value: photoProfileName,
                  className: "block w-full cursor-pointer text-beyours-500" + (photoProfileName ? "text-white" : ""),
                  autoComplete: "photo_profile",
                  Icon: IconPhotoProfile,
                  isFocused: true,
                  onChange: photoProfileHandler,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.photo_profile, className: "mt-2 text-[#fff]" })
            ] }),
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Banner Character", description: "this banner character will displayed in dashboard", className: "my-4", required: true }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "character_banner",
                  type: "file",
                  name: "character_banner",
                  value: characterBannerName,
                  className: "block w-full cursor-pointer text-beyours-500 " + (characterBannerName ? "text-white" : ""),
                  autoComplete: "character_banner",
                  Icon: IconCharacterBanner,
                  isFocused: true,
                  onChange: characterBannerHandler,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.character_banner, className: "mt-2 text-[#fff]" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-16 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Register" }) })
          ] })
        ] }) })
      }
    ) })
  ] });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$3
}, Symbol.toStringTag, { value: "Module" }));
function HeaderStat() {
  const user = usePage().props.auth.user;
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center text-white", children: /* @__PURE__ */ jsxs("span", { className: "leading-none font-thin", children: [
    "@",
    user.name
  ] }) });
}
function DashboardHeader() {
  const user = usePage().props.auth.user;
  return /* @__PURE__ */ jsx("header", { className: "w-full absolute top-0 right-0 h-24 flex justify-end items-center px-4 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center border-[1px] border-beyours-400 bg-beyours-600 rounded-full py-2 pl-4 pr-12 backdrop-blur-sm md:gap-5", children: [
    /* @__PURE__ */ jsx(PhotoProfile, { className: "size-10", imageData: user.photo_profile }),
    /* @__PURE__ */ jsx(HeaderStat, {})
  ] }) });
}
function IconHome({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        }
      )
    }
  );
}
function NavigationButton({
  children,
  active = false,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "flex items-center gap-6 text-beyours-250 font-thin md:w-full p-4 box-border text-sm md:text-base hover:text-beyours-100 hover:stroke-beyours-100 hover:bg-beyours-600 rounded-sm transition-all ease-in-out duration-300 " + (active ? "!text-white stroke-white " : "") + className,
      children
    }
  );
}
function IconTask({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
        }
      )
    }
  );
}
function IconCommunity({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        }
      )
    }
  );
}
function NavigationLabel({ children, isOpen }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: "hidden text-nowrap md:inline " + (isOpen ? "" : "md:hidden"),
      children
    }
  );
}
function SidebarBody$1({ isOpen }) {
  return /* @__PURE__ */ jsx("ul", { className: "md:flex-grow", children: /* @__PURE__ */ jsxs("li", { className: "md:w-full flex md:block md:p-4 pl-4 py-4 gap-4 box-border", children: [
    /* @__PURE__ */ jsxs(
      NavigationButton,
      {
        className: isOpen ? "" : "pl-5",
        href: route("dashboard"),
        active: route().current("dashboard"),
        children: [
          /* @__PURE__ */ jsx(IconHome, {}),
          " ",
          /* @__PURE__ */ jsx(NavigationLabel, { isOpen, children: "Home" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      NavigationButton,
      {
        className: isOpen ? "" : "pl-5",
        href: route("task.index"),
        active: route().current("task.index"),
        children: [
          /* @__PURE__ */ jsx(IconTask, {}),
          " ",
          /* @__PURE__ */ jsx(NavigationLabel, { isOpen, children: "Task" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      NavigationButton,
      {
        className: isOpen ? "" : "pl-5",
        href: route("community.index"),
        active: route().current("community.index"),
        children: [
          /* @__PURE__ */ jsx(IconCommunity, {}),
          /* @__PURE__ */ jsx(NavigationLabel, { isOpen, children: "Community" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      NavigationButton,
      {
        className: isOpen ? "" : "pl-5",
        href: route("profile.edit"),
        active: route().current("profile.edit"),
        children: [
          /* @__PURE__ */ jsx(IconUser, {}),
          /* @__PURE__ */ jsx(NavigationLabel, { isOpen, children: "Profile" })
        ]
      }
    )
  ] }) });
}
function IconLogout({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
        }
      )
    }
  );
}
function SidebarFooter$1({ isOpen }) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center pr-4 py-4 md:px-4 md:w-full md:h-24 md:bg-beyours-650 md:border-t-[.5px] md:border-t-beyours-600 box-border", children: /* @__PURE__ */ jsxs(
    NavigationButton,
    {
      href: route("logout"),
      method: "post",
      as: "button",
      children: [
        /* @__PURE__ */ jsx(IconLogout, { className: isOpen ? "" : "justify-center" }),
        " ",
        /* @__PURE__ */ jsx(NavigationLabel, { isOpen, children: "Logout" })
      ]
    }
  ) });
}
function SidebarHeader$1({ openCloseHandler, isOpen }) {
  return /* @__PURE__ */ jsxs("div", { className: "hidden relative md:flex gap-6 items-center px-4 w-full h-24 bg-beyours-650 border-b-[.5px] border-b-beyours-600 box-border", children: [
    /* @__PURE__ */ jsx("button", { onClick: openCloseHandler, className: "p-4 transition-all ease-in-out duration-300 hover:bg-beyours-550", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "size-8" }) }),
    /* @__PURE__ */ jsx(
      "h2",
      {
        className: "text-white text-xl text-nowrap font-normal leading-tight " + (isOpen ? "" : "hidden"),
        children: "B E Y O U R S"
      }
    )
  ] });
}
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const openCloseHeader = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full overflow-x-scroll fixed bottom-0 left-0 z-50 justify-between gap-4 transition-all ease-in-out duration-300 md:rounded-r-md md:overflow-clip md:relative md:flex-col md:h-screen bg-beyours-700 " + (isOpen ? "md:w-60 xl:w-72" : "md:w-24"), children: [
    /* @__PURE__ */ jsx(SidebarHeader$1, { openCloseHandler: openCloseHeader, isOpen }),
    /* @__PURE__ */ jsx(SidebarBody$1, { isOpen }),
    /* @__PURE__ */ jsx(SidebarFooter$1, { isOpen })
  ] });
}
function PrimaryNavigationButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `inline-flex items-center justify-center bg-gradient-to-b from-beyours-900 from-0% shadow to-beyours-800 rounded-sm border-0 w-full p-4 text-xs font-thin uppercase tracking-widest text-[#fff] transition duration-300 ease-in-out hover:shadow-beyours-1000 hover:shadow-sm focus:shadow-beyours-1000 focus:shadow-sm focus:outline-none focus:ring-beyours-800 active:shadow-md active:shadow-beyours-1000 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function SecondaryNavigationButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `inline-flex items-center justify-center border-[1px] border-beyours-900 rounded-sm w-full p-4 text-xs font-thin uppercase tracking-widest text-[#fff] transition duration-300 ease-in-out hover:shadow-beyours-1000 hover:shadow-sm focus:shadow-beyours-1000 focus:shadow-sm focus:outline-none focus:ring-beyours-800 active:shadow-md active:shadow-beyours-1000 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function NoCharacter() {
  const user = usePage().props.auth.user;
  return /* @__PURE__ */ jsxs("section", { className: "w-full h-full flex justify-center items-center", children: [
    /* @__PURE__ */ jsx(Head, { title: "Guest" }),
    /* @__PURE__ */ jsxs("div", { className: "w-[28rem] flex flex-col items-center text-white text-center font-thin", children: [
      /* @__PURE__ */ jsx(IconEmail, { className: "!size-24 mb-8 stroke-1" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-xl", children: [
        "Hey @",
        user.name,
        ", you don’t have a character yet! Create one to start your adventure."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-beyours-400", children: "Start completing tasks and building legacy." }),
      /* @__PURE__ */ jsxs("div", { className: "flex mt-8 gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryNavigationButton, { href: route("character.create"), className: "md:w-48", children: "Create a character" }),
        /* @__PURE__ */ jsx(SecondaryNavigationButton, { href: route("logout"), method: "post", as: "button", className: "md:w-48", children: "Logout" })
      ] })
    ] })
  ] });
}
function AuthenticatedLayout({ children }) {
  const character = usePage().props.auth.character;
  return /* @__PURE__ */ jsxs("div", { className: "text-white min-h-screen h-screen bg-beyours-750 flex", children: [
    character ? /* @__PURE__ */ jsx(Sidebar, {}) : "",
    /* @__PURE__ */ jsxs("main", { className: "flex-grow relative max-h-screen overflow-y-auto box-border px-4 py-2 sm:px-10 sm:py-8", children: [
      /* @__PURE__ */ jsx(DashboardHeader, {}),
      character ? children : /* @__PURE__ */ jsx(NoCharacter, {})
    ] })
  ] });
}
function Index$5() {
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsx(Head, { title: "Dashboard" }) });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$5
}, Symbol.toStringTag, { value: "Module" }));
function IconDiamondFour({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
        }
      )
    }
  );
}
function IconHand({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
        }
      )
    }
  );
}
function SidebarBody({ role, communityId, attendanced }) {
  return /* @__PURE__ */ jsx("ul", { className: "md:flex-grow", children: /* @__PURE__ */ jsxs("li", { className: "md:w-full flex md:block md:p-4 pl-4 py-4 gap-4 box-border", children: [
    /* @__PURE__ */ jsxs(
      NavigationButton,
      {
        href: route("community.show", communityId),
        active: route().current("community.show"),
        children: [
          /* @__PURE__ */ jsx(IconDiamondFour, {}),
          /* @__PURE__ */ jsx(NavigationLabel, { isOpen: true, children: "Overview" })
        ]
      }
    ),
    attendanced ? /* @__PURE__ */ jsxs(
      NavigationButton,
      {
        href: route("community.attendance.index", communityId),
        active: route().current("community.attendance.index"),
        children: [
          /* @__PURE__ */ jsx(IconHand, {}),
          /* @__PURE__ */ jsx(NavigationLabel, { isOpen: true, children: "Attendance" })
        ]
      }
    ) : ""
  ] }) });
}
function SidebarFooter({ role, token }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center flex-col w-full md:h-24 md:bg-[#161616] md:border-t-[.5px] md:border-t-beyours-600 box-border", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-nowrap text-center text-2xl mb-2 text-white font-normal leading-tight w-full uppercase tracking-widest", children: role }),
    /* @__PURE__ */ jsxs("p", { className: "text-beyours-100 text-xs", children: [
      "T O K E N : ",
      /* @__PURE__ */ jsx("span", { className: "text-white", children: token })
    ] })
  ] });
}
function SidebarHeader({ bannerPath, title }) {
  return /* @__PURE__ */ jsxs("div", { className: "hidden relative w-full bg-[#161616] border-b-[.5px] border-b-beyours-600 box-border md:block md:after:absolute md:after:top-0 md:after:left-0 md:after:w-full md:after:h-full md:after:bg-gradient-to-t md:after:from-[#c4c4c540]", children: [
    /* @__PURE__ */ jsx("img", { src: "/" + (bannerPath || "images/defaultavatar.png"), alt: "", className: "aspect-video w-full bg-beyours-650" }),
    /* @__PURE__ */ jsx(
      "h2",
      {
        className: "text-white line-clamp-1 text-xl text-nowrap font-normal leading-tight absolute bottom-0 m-4 z-10 ",
        children: title
      }
    )
  ] });
}
function SidebarCommunity({ community, character }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex flex-row w-full overflow-x-scroll fixed right-0 z-50 justify-between gap-4 transition-all ease-in-out duration-300 md:rounded-r-md md:overflow-clip md:relative md:w-72 md:flex-col md:h-screen bg-[#161616]",
      children: [
        /* @__PURE__ */ jsx(
          SidebarHeader,
          {
            bannerPath: community.banner_path,
            title: community.name
          }
        ),
        /* @__PURE__ */ jsx(
          SidebarBody,
          {
            role: community.role,
            communityId: community.id,
            attendanced: community.attendance
          }
        ),
        /* @__PURE__ */ jsx(
          SidebarFooter,
          {
            role: character.role,
            token: community.token || community.join_token
          }
        )
      ]
    }
  );
}
function CommunityLayout({ children, community, character }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex bg-beyours-750 min-h-screen", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsx(SidebarCommunity, { community, character }),
    /* @__PURE__ */ jsx("main", { className: "grow h-full", children })
  ] });
}
const OptionInput = forwardRef(function TextInput3({ type = "text", className = "", isFocused = false, children, Icon, name, ...props }, ref) {
  const localRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      return (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }));
  useEffect(() => {
    var _a;
    if (isFocused) {
      (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx("div", { className: "relative flex items-center", children: /* @__PURE__ */ jsx(
    "select",
    {
      ...props,
      name,
      id: name,
      className: "text-sm rounded-sm bg-beyours-600 text-[#ffffff] py-4 border-0 shadow-sm transition-all ease-in-out duration-300 placeholder-beyours-450 placeholder:font-geist focus:border-beyours-500 focus:ring-beyours-500 file:absolute file:top-0 file:right-0 file:h-full file:font-geist file:bg-beyours-550 hover:file:bg-beyours-500 file:transition-all file:ease-in-out file:duration-300 file:text-white file:border-0 file:rounded-s-md file:px-4 file:mr-0 " + className,
      ref: localRef,
      onFocus: () => setIsFocus(true),
      onBlur: () => setIsFocus(false),
      children
    }
  ) });
});
function Create$2({ community, character, attendance }) {
  const [firstJournalImageName, setFirstJournalImageName] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    status: "present",
    first_journal_image: "",
    second_journal_image: ""
  });
  const firstJournalImageHandler = (e) => {
    setFirstJournalImageName(e.target.value);
    setData("first_journal_image", e.target.files[0]);
  };
  const submit = (e) => {
    e.preventDefault();
    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are you sure want to take a attendance now?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        post(route("community.attendance.store", [community.id]));
      }
    });
  };
  return /* @__PURE__ */ jsxs(CommunityLayout, { community, character, children: [
    /* @__PURE__ */ jsx(Head, { title: "Add Community" }),
    /* @__PURE__ */ jsx("section", { className: "flex justify-center items-center w-full min-h-screen p-4 pb-24 2xl:pb-4 h-full 2xl:h-screen", children: /* @__PURE__ */ jsx(
      Dialog,
      {
        title: "Take a attendance",
        useFooter: true,
        className: "sm:max-w-none md:w-[90%] 2xl:h-5/6",
        children: /* @__PURE__ */ jsx("div", { className: "h-full ", children: /* @__PURE__ */ jsxs(
          "form",
          {
            className: "flex flex-col 2xl:flex-row gap-4 h-full ",
            onSubmit: submit,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 w-full min-w-fit flex-row h-full", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: data.first_journal_image ? URL.createObjectURL(data.first_journal_image) : "/logo/logobeyours.svg",
                    alt: "First Journal",
                    className: "w-full 2xl:w-72 box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " + (data.first_journal_image ? "object-cover object-center" : " grayscale")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: data.second_journal_image ? URL.createObjectURL(data.second_journal_image) : "/logo/logobeyours.svg",
                    alt: "Second Journal",
                    className: "w-full 2xl:w-72 box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " + (data.second_journal_image ? "object-cover object-center" : " grayscale")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "w-full h-full overflow-y-auto pb-24 p-1", children: [
                /* @__PURE__ */ jsx(
                  HeaderInputField,
                  {
                    title: "Status",
                    description: "Select your current status: Present, Sick, or Excused.",
                    className: "my-4",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs(
                    OptionInput,
                    {
                      id: "status",
                      name: "status",
                      value: data.status,
                      className: "block w-full",
                      autoComplete: "status",
                      placeholder: "Enter your attendance's status",
                      onChange: (e) => {
                        setData("status", e.target.value);
                      },
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "present", children: "Present" }),
                        /* @__PURE__ */ jsx("option", { value: "sick", children: "Sick" }),
                        /* @__PURE__ */ jsx("option", { value: "excused", children: "Excused" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    InputError,
                    {
                      message: errors.status,
                      className: "mt-2 text-[#fff]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  HeaderInputField,
                  {
                    title: "Capture the Moment",
                    description: "Take a photo to celebrate your first attendance! A second photo can be taken during your next attendance.",
                    className: "my-4",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "first_journal_image",
                      type: "file",
                      name: "first_journal_image",
                      value: firstJournalImageName,
                      className: "block w-full cursor-pointer text-beyours-500 " + (firstJournalImageName ? "text-white" : ""),
                      autoComplete: "first_journal_image",
                      Icon: IconCharacterBanner,
                      onChange: firstJournalImageHandler,
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    InputError,
                    {
                      message: errors.first_journal_image,
                      className: "mt-2 text-[#fff]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-16 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Send" }) })
              ] })
            ]
          }
        ) })
      }
    ) })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$2
}, Symbol.toStringTag, { value: "Module" }));
function HeaderSection({ title, subTitle, className }) {
  return /* @__PURE__ */ jsxs("div", { className: "text-white " + className, children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl", children: title }),
    subTitle ? /* @__PURE__ */ jsx("p", { className: "text-beyours-450", children: subTitle }) : ""
  ] });
}
function IconAdd({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M12 4.5v15m7.5-7.5h-15"
        }
      )
    }
  );
}
function IconDetail({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
        }
      )
    }
  );
}
const TASK_STATUS_CLASS_MAP = {
  0: "bg-amber-500",
  1: "bg-green-500"
};
const TASK_STATUS_TEXT_MAP = {
  0: "Pending",
  1: "Completed"
};
const ATTENDANCE_STATUS_CLASS_MAP = {
  present: "bg-[#84cc1670] border-[1px] border-[#84cc16] text-[#84cc16]",
  sick: "bg-[#f59e0b70] border-[1px] border-[#f59e0b] text-[#f59e0b]",
  excused: "bg-[#3b82f670] border-[1px] border-[#3b82f6] text-[#3b82f6]",
  none: "bg-beyours-550"
};
const ATTENDANCE_STATUS_TEXT_MAP = {
  present: "Present",
  sick: "Sick",
  excused: "Excused",
  none: "None"
};
const ATTENDANCE_VERIFY_CLASS_MAP = {
  1: "bg-[#84cc1670] border-[1px] border-[#84cc16] text-[#84cc16]",
  0: "bg-[#f59e0b70] border-[1px] border-[#f59e0b] text-[#f59e0b]"
};
const ATTENDANCE_VERIFY_TEXT_MAP = {
  1: "Verified",
  0: "Not Verified"
};
function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center rounded-md border border-beyours-900 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function Index$4({
  community,
  character,
  attendances,
  queryParams = null
}) {
  const [swalShown, setSwalShown] = useState(false);
  const [reportDate, setReportDate] = useState(/* @__PURE__ */ new Date());
  console.log(reportDate);
  const queryHandler = (name, value) => {
    const updatedParams = { ...queryParams };
    if (value) {
      updatedParams[name] = value;
    } else {
      delete updatedParams[name];
    }
    queryParams = updatedParams;
    router.get(
      route("community.attendance.index", [community.id, updatedParams])
    );
  };
  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;
    return /* @__PURE__ */ jsx("span", { title: tooltipText, children: shortMonth });
  };
  const exportDataHandler = () => {
    withReactContent(Swal).fire({
      icon: "question",
      title: `Are you want to get report?`,
      html: `If you get report on month's selected it will automatically go to pdf stream and you can export it to pdf. Are you sure? <br/>`,
      didOpen: () => setSwalShown(true),
      didClose: () => setSwalShown(false),
      showConfirmButton: false
    });
  };
  return /* @__PURE__ */ jsxs(CommunityLayout, { community, character: character.data, children: [
    /* @__PURE__ */ jsx(Head, { title: "Attendance" }),
    swalShown && createPortal(
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center gap-5", children: [
        /* @__PURE__ */ jsx(
          DatePicker,
          {
            selected: reportDate,
            onChange: (date) => setReportDate(date),
            renderMonthContent,
            calendarClassName: "!bg-beyours-600 !font-geist !text-beyours-100",
            popperClassName: "!bg-beyours-600",
            className: "my-4 bg-beyours-600 border-beyours-550",
            popperPlacement: "top",
            showMonthYearPicker: true,
            dateFormat: "MM/yyyy"
          }
        ),
        /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            className: "!w-fit h-10",
            onClick: () => {
              window.open(
                route("community.attendance.report", {
                  community: community.id,
                  date: reportDate
                }),
                "_blank"
              );
            },
            children: "YES"
          }
        )
      ] }),
      Swal.getHtmlContainer()
    ),
    /* @__PURE__ */ jsxs("section", { className: "w-full h-screen box-border text-white flex justify-center items-center flex-col p-8 py-24 md:py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px] w-full mb-4 text-sm md:text-base", children: [
        /* @__PURE__ */ jsx(
          HeaderSection,
          {
            title: "Attendance List",
            subTitle: "Take any attendance every morning and afternoon"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          character.data.role === "owner" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "date",
                id: "filter-date",
                name: "filter-date",
                className: "cursor-pointer",
                value: queryParams ? queryParams["date"] : "",
                onChange: (e) => queryHandler("date", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(
              PrimaryButton,
              {
                onClick: exportDataHandler,
                className: "text-nowrap",
                children: "Export"
              }
            )
          ] }) : "",
          !attendances.data.some(
            (attendance) => attendance.id === character.data.id && attendance.attendances
          ) && character.data.role !== "owner" ? /* @__PURE__ */ jsx(
            PrimaryNavigationButton,
            {
              href: route("community.attendance.create", community.id),
              className: "!w-fit !h-fit !p-[.5rem]",
              children: /* @__PURE__ */ jsx(IconAdd, { className: "size-5" })
            }
          ) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full h-4/5 box-border bg-beyours-700 rounded-md relative", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full max-h-full overflow-y-auto block pb-20", children: /* @__PURE__ */ jsxs("table", { className: "w-full h-full table-fixed border-collapse ", children: [
          /* @__PURE__ */ jsx("thead", { className: "border-b-[2px] h-12 border-b-beyours-600 bg-beyours-650 sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "h-16", children: [
            /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-start font-normal", children: "Name" }),
            /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-start font-normal hidden xl:table-cell", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-start font-normal hidden xl:table-cell", children: "Time" }),
            /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-start font-normal hidden xl:table-cell", children: "Verified" }),
            /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-end w-40 font-normal", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "text-beyours-150", children: attendances ? attendances.data.map((attendance) => {
            return /* @__PURE__ */ jsxs(
              "tr",
              {
                className: "border-b-[1px] border-b-beyours-600 " + (attendance.attendances ? "" : "opacity-40"),
                children: [
                  /* @__PURE__ */ jsxs("td", { className: "py-6 px-8 ", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white", children: [
                      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                        PhotoProfile,
                        {
                          className: "size-14",
                          imageData: attendance.photo_profile || ""
                        }
                      ) }),
                      attendance.fullname || ""
                    ] }),
                    /* @__PURE__ */ jsxs("dl", { className: "xl:hidden flex flex-col gap-3", children: [
                      /* @__PURE__ */ jsx("dt", { className: "sr-only", children: "Status" }),
                      /* @__PURE__ */ jsx("dd", { className: "mt-8 ", children: /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "p-2 text-white rounded-md " + ATTENDANCE_STATUS_CLASS_MAP[attendance.attendances ? attendance.attendances.pivot.status : "none"],
                          children: ATTENDANCE_STATUS_TEXT_MAP[attendance.attendances ? attendance.attendances.pivot.status : "none"]
                        }
                      ) }),
                      /* @__PURE__ */ jsx("dt", { className: "sr-only", children: "Time" }),
                      /* @__PURE__ */ jsx("dd", { className: "mt-4 ", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
                        /* @__PURE__ */ jsx("span", { className: "p-2 bg-beyours-550 w-fit text-nowrap rounded-md text-sm", children: attendance.attendances ? attendance.attendances.pivot.created_at : "0000-00-00 00:00:00" }),
                        /* @__PURE__ */ jsx("span", { className: "p-2 bg-beyours-550 w-fit text-nowrap rounded-md text-sm", children: attendance.attendances ? attendance.attendances.pivot.updated_at : "0000-00-00 00:00:00" })
                      ] }) }),
                      /* @__PURE__ */ jsx("dt", { className: "sr-only", children: "Verify" }),
                      /* @__PURE__ */ jsx("dd", { className: "mt-4 ", children: /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "text-white px-3 py-2 rounded-md text-nowrap " + ATTENDANCE_VERIFY_CLASS_MAP[attendance.attendances ? attendance.attendances.pivot.verified : 0],
                          children: ATTENDANCE_VERIFY_TEXT_MAP[attendance.attendances ? attendance.attendances.pivot.verified : 0]
                        }
                      ) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "py-6 px-8 hidden xl:table-cell ", children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "text-white px-3 py-2 rounded-md text-nowrap " + ATTENDANCE_STATUS_CLASS_MAP[attendance.attendances ? attendance.attendances.pivot.status : "none"],
                      children: ATTENDANCE_STATUS_TEXT_MAP[attendance.attendances ? attendance.attendances.pivot.status : "none"]
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "py-6 px-8 hidden xl:table-cell ", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "p-2 bg-beyours-550 w-fit text-nowrap rounded-md text-sm", children: attendance.attendances ? attendance.attendances.pivot.created_at : "0000-00-00 00:00:00" }),
                    /* @__PURE__ */ jsx("span", { className: "p-2 bg-beyours-550 w-fit text-nowrap rounded-md text-sm", children: attendance.attendances ? attendance.attendances.pivot.updated_at : "0000-00-00 00:00:00" })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-6 px-8 hidden xl:table-cell ", children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "text-white px-3 py-2 rounded-md text-nowrap " + ATTENDANCE_VERIFY_CLASS_MAP[attendance.attendances ? attendance.attendances.pivot.verified : 0],
                      children: ATTENDANCE_VERIFY_TEXT_MAP[attendance.attendances ? attendance.attendances.pivot.verified : 0]
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "py-6 px-8 ", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full flex justify-end", children: attendance.attendances ? /* @__PURE__ */ jsx(
                    Link,
                    {
                      className: "rounded-full bg-beyours-1100 border-[1px] border-beyours-900 p-[4px] hover:bg-beyours-900 hover:scale-110 transition-all ease-in-out duration-300 ",
                      href: route("community.attendance.show", {
                        community: community.id,
                        attendance: attendance.attendances.id,
                        c: attendance.id
                      }),
                      children: /* @__PURE__ */ jsx(IconDetail, { className: "stroke-white" })
                    }
                  ) : "" }) })
                ]
              },
              attendance.id
            );
          }) : "" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex absolute bottom-0 bg-beyours-650 border-t-beyours-600 border-t-[1px] px-6 py-4 h-20 box-border" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$4
}, Symbol.toStringTag, { value: "Module" }));
function Index$3({ community, character, attendances }) {
  return /* @__PURE__ */ jsxs(CommunityLayout, { community, character: character.data, children: [
    /* @__PURE__ */ jsx(Head, { title: "Report" }),
    /* @__PURE__ */ jsxs("section", { className: "flex flex-col h-screen", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsx("div", { className: "w-full h-full", children: /* @__PURE__ */ jsx(PDFViewer, { className: "w-full h-full", children: /* @__PURE__ */ jsx(
        ReportDocument,
        {
          attendances: attendances.data,
          character
        }
      ) }) })
    ] })
  ] });
}
function ReportDocument({ character, attendances }) {
  return /* @__PURE__ */ jsx(
    Document,
    {
      title: "report-attendance",
      creator: character.data.fullname,
      producer: character.data.fullname,
      children: attendances.map((attendance) => {
        return attendance.characters.map((character2) => {
          if (character2.attendances) {
            return /* @__PURE__ */ jsxs(Page, { size: "A4", children: [
              /* @__PURE__ */ jsxs(View, { style: styles.container, children: [
                /* @__PURE__ */ jsxs(View, { style: styles.imageContainer, children: [
                  /* @__PURE__ */ jsx(
                    Image,
                    {
                      style: styles.image,
                      source: "/" + character2.attendances.pivot.first_photo_path || ""
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Image,
                    {
                      style: styles.image,
                      source: "/" + character2.attendances.pivot.second_photo_path || ""
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(View, { style: styles.content, children: [
                  /* @__PURE__ */ jsxs(Text, { style: styles.date, children: [
                    "# ",
                    attendance.created_at
                  ] }),
                  /* @__PURE__ */ jsxs(View, { style: styles.profile, children: [
                    /* @__PURE__ */ jsx(
                      Image,
                      {
                        style: styles.photoProfile,
                        src: "/" + character2.photo_profile
                      }
                    ),
                    /* @__PURE__ */ jsxs(View, { children: [
                      /* @__PURE__ */ jsx(Text, { style: styles.nameProfile, children: character2.fullname }),
                      /* @__PURE__ */ jsxs(Text, { style: styles.subProfile, children: [
                        character2.email,
                        " | ",
                        character2.phone_number,
                        " |",
                        " ",
                        character2.address
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(View, { style: styles.informationContainer, children: [
                    /* @__PURE__ */ jsx(Text, { style: styles.title, children: "Status: " }),
                    /* @__PURE__ */ jsx(Text, { style: styles.value, children: character2.attendances.pivot.status || "" }),
                    /* @__PURE__ */ jsx(Text, { style: styles.title, children: "Journal: " }),
                    /* @__PURE__ */ jsx(Text, { style: styles.value, children: character2.attendances.pivot.journal || "wduadhiaudwhaudhwuiduasudi" }),
                    /* @__PURE__ */ jsx(Text, { style: styles.title, children: "First Attendance: " }),
                    /* @__PURE__ */ jsx(Text, { style: styles.value, children: character2.attendances.pivot.created_at || "" }),
                    /* @__PURE__ */ jsx(Text, { style: styles.title, children: "Second Attendance: " }),
                    /* @__PURE__ */ jsx(Text, { style: styles.value, children: character2.attendances.pivot.updated_at || "" }),
                    /* @__PURE__ */ jsx(Text, { style: styles.title, children: "PKL:" }),
                    /* @__PURE__ */ jsx(Text, { style: styles.value, children: "PT. Tilikgram" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Text,
                {
                  style: styles.pageNumber,
                  render: ({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`,
                  fixed: true
                }
              )
            ] }, attendance.id);
          }
        });
      })
    }
  );
}
Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf"
});
const styles = StyleSheet.create({
  content: {
    paddingTop: 25,
    paddingBottom: 65,
    paddingHorizontal: 15
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  informationContainer: {
    paddingHorizontal: 4,
    paddingVertical: 10
  },
  date: {
    fontSize: 14,
    fontFamily: "Roboto",
    textAlign: "right",
    marginBottom: 20
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    borderBottom: 1,
    borderBottomColor: "#cecece",
    padding: 10
  },
  photoProfile: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center"
  },
  nameProfile: {
    fontSize: 18,
    fontFamily: "Roboto"
  },
  subProfile: {
    fontSize: 10,
    color: "grey",
    fontFamily: "Roboto"
  },
  title: {
    fontSize: 12,
    color: "grey",
    fontFamily: "Roboto"
  },
  value: {
    fontSize: 18,
    fontFamily: "Roboto",
    marginBottom: 15
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify"
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "grey"
  },
  image: {
    aspectRatio: 3 / 4,
    width: 180,
    objectFit: "cover",
    objectPosition: "center",
    backgroundColor: "grey"
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey"
  }
});
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
const TextAreaInput = forwardRef(function TextAreaInput2({ type = "text", className = "", isFocused = false, name, ...props }, ref) {
  const localRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      return (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }));
  useEffect(() => {
    var _a;
    if (isFocused) {
      (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx("div", { className: "relative flex items-center", children: /* @__PURE__ */ jsx(
    "textarea",
    {
      ...props,
      type,
      className: "text-sm resize-none rounded-sm bg-beyours-600 text-[#ffffff] py-4 border-0 shadow-sm transition-all ease-in-out duration-300 placeholder-beyours-450 placeholder:font-geist focus:border-beyours-500 focus:ring-beyours-500 file:absolute file:top-0 file:right-0 file:h-full file:font-geist file:bg-beyours-550 hover:file:bg-beyours-500 file:transition-all file:ease-in-out file:duration-300 file:text-white file:border-0 file:rounded-s-md file:px-4 file:mr-0 " + className,
      ref: localRef,
      onFocus: () => setIsFocus(true),
      onBlur: () => setIsFocus(false)
    }
  ) });
});
function Show$1({ community, character, attendance }) {
  const [secondJournalImageName, setSecondJournalImageName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    second_journal_image: null,
    journal: attendance.attendance.journal || ""
  });
  const socondAttendanceHandler = (e) => {
    e.preventDefault();
    setIsEdit(isEdit ? false : true);
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    setIsEdit(isEdit ? false : true);
  };
  const secondJournalImageHandler = (e) => {
    setSecondJournalImageName(e.target.value);
    setData("second_journal_image", e.target.files[0]);
  };
  const verifyHandler = (e) => {
    e.preventDefault();
    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are you sure want to verify?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        post(
          route("community.attendance.verify", {
            _method: "put",
            community: community.id,
            attendance: attendance.attendance.attendance_id,
            character,
            member: attendance.id
          })
        );
      }
    });
  };
  const submit = (e) => {
    e.preventDefault();
    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are you sure want to take a attendance now?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        post(
          route("community.attendance.update", {
            _method: "put",
            community: community.id,
            attendance: attendance.attendance.attendance_id
          })
        );
      }
    });
  };
  return /* @__PURE__ */ jsxs(CommunityLayout, { community, character: character.data, children: [
    /* @__PURE__ */ jsx(Head, { title: "Detail" }),
    /* @__PURE__ */ jsx("section", { className: "flex justify-center items-center w-full min-h-screen p-4 pb-24 2xl:pb-4 h-full 2xl:h-screen", children: /* @__PURE__ */ jsx(
      Dialog,
      {
        title: "Take a attendance",
        useFooter: true,
        className: "sm:max-w-none md:w-[90%] 2xl:h-5/6",
        children: /* @__PURE__ */ jsx("div", { className: "h-full ", children: /* @__PURE__ */ jsxs(
          "form",
          {
            className: "flex flex-col 2xl:flex-row gap-4 h-full ",
            onSubmit: submit,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 w-full min-w-fit flex-row h-full", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: data.first_journal_image ? URL.createObjectURL(data.first_journal_image) : "/" + (attendance.attendance.first_photo_path || "logo/logobeyours.svg"),
                    alt: "First Journal",
                    className: "w-full 2xl:w-72 box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " + (data.first_journal_image || attendance.attendance.first_photo_path ? "object-cover object-center" : " grayscale")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: data.second_journal_image ? URL.createObjectURL(data.second_journal_image) : "/" + (attendance.attendance.second_photo_path || "logo/logobeyours.svg"),
                    alt: "Second Journal",
                    className: "w-full 2xl:w-72 box-border h-fit aspect-[9/16] border-[1px] border-beyours-550 bg-beyours-600 rounded-md text-transparent " + (data.second_journal_image || attendance.attendance.second_photo_path ? "object-cover object-center" : " grayscale")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "w-full max-h-[94%] h-full overflow-y-auto p-1 pb-16", children: [
                /* @__PURE__ */ jsx(
                  HeaderInputField,
                  {
                    title: "Journal",
                    description: "Capture the essence of your activity today in a few sentences. What makes it special?",
                    className: "my-4",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                  /* @__PURE__ */ jsx(
                    TextAreaInput,
                    {
                      readOnly: !isEdit,
                      id: "journal",
                      type: "text",
                      isFocused: true,
                      name: "journal",
                      value: data.journal,
                      className: "block w-full h-64",
                      placeholder: "Enter your journal",
                      autoComplete: "journal",
                      onChange: (e) => setData("journal", e.target.value),
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    InputError,
                    {
                      message: errors.profession,
                      className: "mt-2 text-[#fff]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  HeaderInputField,
                  {
                    title: "Status",
                    description: "What is your status now copy!!",
                    className: "my-4 opacity-55"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs(
                    OptionInput,
                    {
                      disabled: true,
                      id: "status",
                      name: "status",
                      value: data.status,
                      className: "block w-full opacity-45",
                      autoComplete: "status",
                      placeholder: "Enter your attendance's status",
                      onChange: (e) => {
                        setData("status", e.target.value);
                      },
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "present", children: "Present" }),
                        /* @__PURE__ */ jsx("option", { value: "sick", children: "Sick" }),
                        /* @__PURE__ */ jsx("option", { value: "occupied", children: "Occupied" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    InputError,
                    {
                      message: errors.status,
                      className: "mt-2 text-[#fff]"
                    }
                  )
                ] }),
                !attendance.attendance.journal && character.data.id === attendance.id ? /* @__PURE__ */ jsx(
                  EditForm,
                  {
                    isEdit,
                    socondAttendanceHandler,
                    secondJournalImageHandler,
                    secondJournalImageName,
                    processing,
                    errors,
                    cancelHandler
                  }
                ) : "",
                character.data.role === "owner" ? /* @__PURE__ */ jsx("div", { className: "mt-16 flex items-center justify-end gap-4", children: /* @__PURE__ */ jsx(
                  PrimaryButton,
                  {
                    disabled: processing,
                    className: "text-white !w-fit !h-fit",
                    onClick: verifyHandler,
                    children: "Verify"
                  }
                ) }) : ""
              ] })
            ]
          }
        ) })
      }
    ) })
  ] });
}
function EditForm({
  isEdit,
  socondAttendanceHandler,
  secondJournalImageHandler,
  secondJournalImageName,
  cancelHandler,
  processing,
  errors
}) {
  if (isEdit) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        HeaderInputField,
        {
          title: "Capture the Moment",
          description: "Take a photo to celebrate your second attendance!",
          className: "my-4",
          required: true
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "second_journal_image",
            type: "file",
            name: "second_journal_image",
            value: secondJournalImageName,
            className: "block w-full cursor-pointer text-beyours-500 " + (secondJournalImageName ? "text-white" : ""),
            autoComplete: "secondJournalImageName",
            Icon: IconCharacterBanner,
            onChange: secondJournalImageHandler,
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.second_journal_image,
            className: "mt-2 text-[#fff]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 flex items-center justify-end gap-4", children: [
        /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            className: "text-white px-3 py-4",
            onClick: cancelHandler,
            disabled: processing,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            disabled: processing,
            className: "text-white !w-fit !h-fit",
            children: "Send"
          }
        )
      ] })
    ] });
  } else {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-8 text-white w-full h-fit", children: /* @__PURE__ */ jsx(
      PrimaryButton,
      {
        disabled: processing,
        className: "!w-fit",
        onClick: socondAttendanceHandler,
        children: "Second Attendance"
      }
    ) });
  }
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show$1
}, Symbol.toStringTag, { value: "Module" }));
function Create$1() {
  const [bannerImageName, setBannerImageName] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    attendance: false,
    banner_image_file: ""
  });
  const bannerEventHandler = (e) => {
    setBannerImageName(e.target.value);
    setData("banner_image_file", e.target.files[0]);
  };
  const submit = (e) => {
    e.preventDefault();
    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are ypu sure to want create a community?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        post(route("community.store"));
      }
    });
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Add Community" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full min-h-screen p-4", children: /* @__PURE__ */ jsx(
      Dialog,
      {
        title: "Create a community",
        useFooter: true,
        className: "md:max-w-none md:w-3/5 md:h-5/6",
        children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("form", { className: "flex gap-4 relative", onSubmit: submit, children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-full flex justify-center mb-10" }),
          /* @__PURE__ */ jsxs("div", { className: "w-full h-full px-2 py-1", children: [
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Name", description: "A unique name that represents your community in style. Let it stand out in the crowd!", className: "mb-4", required: true }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "name",
                  name: "name",
                  value: data.name,
                  className: "block w-full",
                  autoComplete: "name",
                  placeholder: "Enter your community's name",
                  isFocused: true,
                  onChange: (e) => setData("name", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2 text-[#fff]" })
            ] }),
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Description", description: "Capture the essence of your community in a few sentences. What makes it special?", className: "my-4", required: true }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx(
                TextAreaInput,
                {
                  id: "description",
                  type: "text",
                  name: "description",
                  value: data.description,
                  className: "block w-full h-64",
                  placeholder: "Enter your description",
                  autoComplete: "description",
                  onChange: (e) => setData("description", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.profession, className: "mt-2 text-[#fff]" })
            ] }),
            /* @__PURE__ */ jsx(HeaderInputField, { title: "Banner Community", description: "A visual masterpiece! This banner will shine in the community overview and list. Choose wisely.", className: "my-4", required: true }),
            /* @__PURE__ */ jsx("img", { src: data.banner_image_file ? URL.createObjectURL(data.banner_image_file) : "/logo/logobeyours.svg", alt: "Banner Community", className: "w-full aspect-video mb-2 rounded-sm bg-beyours-600 box-border " + (data.banner_image_file ? "" : "p-28 grayscale") }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "banner_image_file",
                  type: "file",
                  name: "banner_image_file",
                  value: bannerImageName,
                  className: "block w-full cursor-pointer text-beyours-500 " + (bannerImageName ? "text-white" : ""),
                  autoComplete: "banner_image_file",
                  Icon: IconCharacterBanner,
                  onChange: bannerEventHandler,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.banner_image_file, className: "mt-2 text-[#fff]" })
            ] }),
            /* @__PURE__ */ jsx("label", { htmlFor: "attendance", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx(HeaderInputField, { title: "Attendance", description: "Enable this feature to track members' participation in your community events seamlessly.", className: "my-4", required: true }),
              /* @__PURE__ */ jsx("input", { type: "checkbox", name: "attendance", id: "attendance", onChange: (e) => setData("attendance", e.target.checked), className: "rounded-full size-4 mr-4 transition-all ease-in-out duration-200 checked:bg-beyours-900 text-beyours-900 focus:ring-beyours-900 " })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-16 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Register" }) })
          ] })
        ] }) })
      }
    ) })
  ] });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$1
}, Symbol.toStringTag, { value: "Module" }));
function Card({ href, title, owner, bannerPath, memberCount }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-auto h-fit rounded-md overflow-hidden bg-beyours-700 border-[1px] border-beyours-600", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full h-fit", children: /* @__PURE__ */ jsx(
      "img",
      {
        className: "aspect-video object-cover object-center w-full",
        src: bannerPath || "images/defaultavatar.png",
        alt: ""
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex-1 p-3 box-border relative", children: [
      /* @__PURE__ */ jsx(Link, { href, children: /* @__PURE__ */ jsx("h3", { children: title }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-beyours-250", children: [
        "by ",
        owner
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-beyours-250", children: [
        /* @__PURE__ */ jsx("span", { className: "text-white", children: memberCount || 0 }),
        " Members"
      ] })
    ] })
  ] });
}
function SearchBar({
  type = "text",
  className = "",
  Icon,
  name,
  eventHandler,
  ...props
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center " + className, children: [
    Icon ? /* @__PURE__ */ jsx("div", { className: "absolute left-0 mx-4 z-10", children: /* @__PURE__ */ jsx("label", { htmlFor: name, children: /* @__PURE__ */ jsx(
      Icon,
      {
        className: isFocus || inputValue.length > 0 ? "stroke-beyours-100" : "stroke-beyours-600"
      }
    ) }) }) : "",
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        type,
        className: (Icon ? "pl-14 " : "") + "text-sm rounded-md bg-beyours-700 text-[#ffffff] py-4 border-0 shadow-sm transition-all ease-in-out duration-300 placeholder:text-beyours-450 placeholder:font-geist focus:border-beyours-600 focus:ring-beyours-600 w-full",
        value: inputValue,
        onFocus: () => setIsFocus(true),
        onBlur: () => setIsFocus(false),
        onChange: (e) => {
          setInputValue(e.target.value);
          eventHandler ? eventHandler(e) : "";
        }
      }
    )
  ] });
}
function IconInCommunity({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
        }
      )
    }
  );
}
function IconSearch({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        }
      )
    }
  );
}
function Index$2({ communities }) {
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const joinHandler = (e) => {
    e.preventDefault();
    withReactContent(Swal).fire({
      title: "Get token community",
      text: "Get token from the owner's community so you can join with the token",
      input: "text",
      icon: "info",
      inputValue,
      preConfirm: (inputValue2) => {
        if (!inputValue2) {
          Swal.showValidationMessage("Token is required");
          return false;
        }
        const url = route("community.join", inputValue2);
        return url;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(result.value).then((response) => {
          Swal.fire("Success", "You have joined the community!", "success");
          route("community.index");
        }).catch((error) => {
          Swal.fire("Error", "Failed to join the community.", "error");
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Community" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 pb-26 w-full py-16 md:h-full md:pb-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px]", children: [
        /* @__PURE__ */ jsx(
          HeaderSection,
          {
            title: "Community",
            subTitle: "All communitites you joined"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            SecondaryButton,
            {
              onClick: joinHandler,
              className: "!w-fit !h-fit !p-[.5rem]",
              children: /* @__PURE__ */ jsx(IconInCommunity, { className: "size-5 stroke-beyours-900" })
            }
          ),
          /* @__PURE__ */ jsx(
            PrimaryNavigationButton,
            {
              href: route("community.create"),
              className: "!w-fit !h-fit !p-[.5rem]",
              children: /* @__PURE__ */ jsx(IconAdd, { className: "size-5" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex w-full", children: /* @__PURE__ */ jsx(
        SearchBar,
        {
          className: "w-full",
          placeholder: "Search for communities",
          Icon: IconSearch,
          eventHandler: searchHandler
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-full grid px-2 gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: communities.data.filter(
        (community) => searchValue ? community.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) : community
      ).map((community) => /* @__PURE__ */ jsx(
        Card,
        {
          title: community.name,
          bannerPath: community.banner_path,
          memberCount: community.members.length,
          owner: community.members.filter((member) => member.role === "owner").map((member) => member.fullname),
          href: route("community.show", community.id)
        },
        community.id
      )) }),
      communities.data.filter(
        (community) => searchValue ? community.name.toLowerCase().includes(searchValue.toLowerCase()) : community
      ).length === 0 && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full h-full min-h-96", children: /* @__PURE__ */ jsx("span", { className: "py-6 px-8 text-center text-beyours-300 italic", children: "There is no community matching your search or joined." }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full" })
    ] })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
function Index$1({
  community,
  character,
  members,
  ownerCommunity
}) {
  return /* @__PURE__ */ jsxs(CommunityLayout, { community: community.data, character: character.data, children: [
    /* @__PURE__ */ jsx(Head, { title: community.data.name }),
    /* @__PURE__ */ jsxs("section", { className: "h-screen w-full p-8 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full h-3/5 rounded-md overflow-hidden border-[1px] border-beyours-550", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "h-full w-full object-cover object-center opacity-45",
          src: "/" + community.data.banner_path,
          alt: "Banner Community"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-full grow flex", children: /* @__PURE__ */ jsxs("div", { className: "bg-beyours-700 rounded-md h-full w-96 p-6 border-[1px] border-beyours-550", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b-[1px] border-b-beyours-600 pb-4 flex gap-4 items-center box-border", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            PhotoProfile,
            {
              imageData: ownerCommunity.data.photo_profile,
              className: "size-20"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "overflow-hidden ", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white text-xl text-nowrap text-ellipsis overflow-hidden", children: ownerCommunity.data.fullname }),
            /* @__PURE__ */ jsxs("p", { className: "text-beyours-450 text-sm", children: [
              ownerCommunity.data.email,
              " -",
              " ",
              ownerCommunity.data.phone_number
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-2 py-4 text-beyours-200", children: /* @__PURE__ */ jsxs("p", { className: "text-white", children: [
          "Description :",
          /* @__PURE__ */ jsxs("span", { className: "line-clamp-4 text-beyours-350 text-sm py-1", children: [
            community.data.description,
            " dawdjh akdhwaiud hawidhw aduhaw dhwaid hwaiudh audhwaiuf hawfhiawufh aiudhawu hdawiu hdauhd audhawuhdwahdudawui hdwah dwuadiua dhwadui hawdiu ahwduhi adui ahdiuaw hdwauhdiwau hdawuhdiwaudh awudhauw dawi hwiaudha iudhawiudh aiwudhawiudawhuid"
          ] })
        ] }) })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function CharacterBody({ className, character }) {
  return /* @__PURE__ */ jsx("table", { className, children: /* @__PURE__ */ jsxs("tbody", { children: [
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { className: "text-beyours-400 w-24 block", children: "Profession" }),
      /* @__PURE__ */ jsxs("td", { children: [
        ": ",
        character.profession
      ] })
    ] }),
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { className: "text-beyours-400 w-24 block", children: "Skill" }),
      /* @__PURE__ */ jsxs("td", { children: [
        ": ",
        `${character.skills[3].name}, ${character.skills[4].name}`
      ] })
    ] })
  ] }) });
}
function CharacterHeader({ className, character }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end " + className, children: [
    /* @__PURE__ */ jsx("span", { className: "text-2xl", children: character.fullname }),
    /* @__PURE__ */ jsxs("span", { className: "text-sm text-beyours-400", children: [
      "Level ",
      character.level || 0
    ] })
  ] });
}
function IconHeart({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        }
      )
    }
  );
}
function StatBar({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: "h-fit w-full bg-beyours-600 border-[1px] border-beyours-550 rounded-full p-[1px] box-content", children: /* @__PURE__ */ jsx("div", { className: "rounded-full " + className, ...props }) });
}
class CharacterCalculation {
  CalculationMaxHealth(level = 1) {
    return 5 * level;
  }
  CalculationMaxExperience(level = 1) {
    return 10 ^ level;
  }
  CalculationMaxSkillExperience(level = 1) {
    return 15 ^ level;
  }
}
function CharacterHealth({ className, character }) {
  const characterCalculation = new CharacterCalculation();
  const [maxHealth, setMaxHealth] = useState(
    characterCalculation.CalculationMaxHealth(character.level)
  );
  const [scaleHealthBar, setScaleHealthBar] = useState(
    character.health / maxHealth
  );
  useEffect(() => {
    setMaxHealth(characterCalculation.CalculationMaxHealth(character.level));
  }, [character.level]);
  useEffect(() => {
    setScaleHealthBar(character.health / maxHealth);
  }, [character.health]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex gap-2 w-full justify-between items-center " + className,
      children: [
        /* @__PURE__ */ jsx(IconHeart, {}),
        /* @__PURE__ */ jsx(
          StatBar,
          {
            className: `h-2 bg-beyours-100 origin-left transition-all ease-in-out duration-300`,
            style: { transform: `scaleX(${scaleHealthBar})` }
          }
        ),
        /* @__PURE__ */ jsxs("span", { children: [
          character.health,
          "/",
          maxHealth
        ] })
      ]
    }
  );
}
function CharacterLevelUp({ className, character }) {
  const maxExperience = new CharacterCalculation().CalculationMaxExperience(
    character.level
  );
  const progress = character.experience / maxExperience;
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("p", { children: "Level Up" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        StatBar,
        {
          className: "bg-yellow-200 h-2 w-full origin-left ",
          style: { transform: `scaleX(${progress})` }
        }
      ),
      /* @__PURE__ */ jsx("span", { children: `${character.experience}/${new CharacterCalculation().CalculationMaxExperience(
        character.level
      )}` })
    ] })
  ] });
}
function CharacterInfo({ className, character }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full p-4 flex flex-col " + className, children: [
    /* @__PURE__ */ jsx(CharacterHeader, { character: character == null ? void 0 : character.data }),
    /* @__PURE__ */ jsx(CharacterHealth, { character: character == null ? void 0 : character.data }),
    /* @__PURE__ */ jsx(CharacterBody, { character: character == null ? void 0 : character.data, className: "mt-4" }),
    /* @__PURE__ */ jsx(CharacterLevelUp, { character: character == null ? void 0 : character.data, className: "mt-2" })
  ] });
}
function ContactItem({ fullname, name, imageData }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 h-full overflow-y-auto py-4 px-8 border-b-[1px] border-b-beyours-600 even:bg-beyours-550", children: [
    /* @__PURE__ */ jsx(PhotoProfile, { className: "size-16", imageData }),
    /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
      /* @__PURE__ */ jsx("p", { children: fullname }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-beyours-400", children: [
        "@",
        name
      ] })
    ] })
  ] });
}
function ContactList({ className, globalFriends }) {
  return /* @__PURE__ */ jsx("ul", { className: "bg-beyours-700 overflow-y-auto h-full rounded-md " + className, children: globalFriends.data.map((globalFriend) => {
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ContactItem, { fullname: globalFriend.character.fullname, name: globalFriend.name, imageData: globalFriend.photo_profile }) }, globalFriend.id);
  }) });
}
function SkillItem({ children, name, level, experience }) {
  const maxExperienceSkill = new CharacterCalculation().CalculationMaxSkillExperience();
  return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: `overflow-hidden rounded-full border-[1px] border-white flex items-center justify-center size-24 relative  skill`, children: [
      children,
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-beyours-800 shadow-xl shadow-beyours-900 drop-shadow-lg to-beyours-900 origin-bottom transition-all ease-in-out duration-300 ", style: { transform: `scaleY(${experience / maxExperienceSkill})` } })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-nowrap text-beyours-100 mt-2", children: [
      "Level ",
      level
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-md text-nowrap", children: name })
  ] });
}
function IconStar({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        }
      )
    }
  );
}
function IconFire({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "size-6 " + className,
      children: [
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" }),
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" })
      ]
    }
  );
}
function SkillTree({ character }) {
  return /* @__PURE__ */ jsxs("ul", { className: "flex w-full h-full items-center overflow-x-auto p-12 gap-14 box-border", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      SkillItem,
      {
        name: character.data.skills[0].name,
        experience: character.data.skills[0].experience,
        level: character.data.skills[0].level,
        children: /* @__PURE__ */ jsx(IconHeart, { className: "size-10 stroke-1 relative z-10" })
      }
    ) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      SkillItem,
      {
        name: character.data.skills[1].name,
        experience: character.data.skills[1].experience,
        level: character.data.skills[1].level,
        children: /* @__PURE__ */ jsx(IconStar, { className: "size-10 stroke-1 relative z-10" })
      }
    ) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      SkillItem,
      {
        name: character.data.skills[2].name,
        experience: character.data.skills[2].experience,
        level: character.data.skills[2].level,
        children: /* @__PURE__ */ jsx(IconFire, { className: "size-10 stroke-1 relative z-10" })
      }
    ) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      SkillItem,
      {
        name: character.data.skills[3].name,
        experience: character.data.skills[3].experience,
        level: character.data.skills[3].level,
        children: /* @__PURE__ */ jsx(IconSkill, { className: "size-10 stroke-1 relative z-10" })
      }
    ) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      SkillItem,
      {
        name: character.data.skills[4].name,
        experience: character.data.skills[4].experience,
        level: character.data.skills[4].level,
        children: /* @__PURE__ */ jsx(IconSkill, { className: "size-10 stroke-1 relative z-10" })
      }
    ) })
  ] });
}
function TaskOverview({ titles, tasks, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "bg-beyours-700 rounded-md h-full overflow-y-scroll " + className,
      children: /* @__PURE__ */ jsxs("table", { className: "border-collapse table-fixed w-full", children: [
        /* @__PURE__ */ jsx("thead", { className: "sticky top-0 left-0", children: /* @__PURE__ */ jsx("tr", { className: "bg-[#191919] border-b-[.5px] border-b-beyours-600 ", children: titles == null ? void 0 : titles.map((title, index) => {
          return /* @__PURE__ */ jsx("th", { className: "text-start py-4 px-8 font-thin", children: title }, index);
        }) }) }),
        /* @__PURE__ */ jsx("tbody", { children: tasks == null ? void 0 : tasks.map((task) => {
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "text-beyours-300 border-b-[.5px] border-b-[#141414]",
              children: [
                /* @__PURE__ */ jsx("td", { className: "p-8", children: task.title }),
                /* @__PURE__ */ jsxs("td", { className: "p-8 ", children: [
                  " ",
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "p-2 text-white rounded-md " + TASK_STATUS_CLASS_MAP[task.task.done],
                      children: TASK_STATUS_TEXT_MAP[task.task.done]
                    }
                  ),
                  " "
                ] })
              ]
            },
            task.id
          );
        }) })
      ] })
    }
  );
}
function DashboardHome({ tasks, character, globalFriends }) {
  const user = usePage().props.auth.user;
  const titles = ["Task", "Status"];
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full md:h-full gap-4 pb-24 md:pb-0", children: [
      /* @__PURE__ */ jsx(
        HeaderSection,
        {
          title: "Dashboard",
          subTitle: `Welcome back, ${user.name}`
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:h-[90%]", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-beyours-700 rounded-md overflow-hidden border-[1px] border-beyours-550 flex-grow col-span-1 row-span-2 relative md:w-[28rem] md:h-fit", children: [
          /* @__PURE__ */ jsx(
            BannerCharacter,
            {
              character,
              className: "h-auto w-full after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-beyours-700 after:h-full after:w-full"
            }
          ),
          /* @__PURE__ */ jsx(CharacterInfo, { character, className: "relative z-10" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 h-full w-full md:grid-cols-3 grid-rows-3 xl:grid-rows-[1fr] box-border", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-beyours-700 rounded-md max-h-96 border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-2 md:max-h-none xl:col-span-2 xl:row-span-3", children: /* @__PURE__ */ jsx(TaskOverview, { titles, tasks }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-beyours-700 rounded-md max-h-96 border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-1 md:max-h-none xl:col-span-1 xl:row-span-4", children: /* @__PURE__ */ jsx(ContactList, { globalFriends }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-beyours-700 rounded-md max-h-96 h-fit border-[1px] border-beyours-550 col-span-1 row-span-1 md:col-span-3 md:row-span-1 md:max-h-none xl:col-span-2 xl:row-span-1", children: /* @__PURE__ */ jsx(SkillTree, { character }) })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DashboardHome
}, Symbol.toStringTag, { value: "Module" }));
function DashboardProfile() {
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DashboardProfile
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {
  }
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog$1,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-white", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-beyours-100", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-white", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-beyours-100", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password",
            value: "Password",
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-white", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-beyours-100", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "current_password", value: "Current Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.current_password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-white", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-beyours-100", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6 text-white", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile" }),
    /* @__PURE__ */ jsx("div", { className: "py-12 pb-24 xl:pb-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-beyours-700 p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
        UpdateProfileInformation,
        {
          mustVerifyEmail,
          status,
          className: "max-w-xl"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "bg-beyours-700 p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-beyours-700 p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
    ] }) })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Create({ skills }) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    due_at: "",
    category: "none",
    difficult: "easy"
  });
  const submit = (e) => {
    e.preventDefault();
    withReactContent(Swal).fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      text: "Are you sure to want create a task?",
      icon: "question",
      denyButtonText: "No",
      preConfirm: () => {
        post(route("task.store"));
      }
    });
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Add Community" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full min-h-screen p-4 py-24 sm:py-4", children: /* @__PURE__ */ jsx(
      Dialog,
      {
        title: "Create a task",
        useFooter: true,
        className: "md:max-w-none md:w-3/5 md:h-5/6",
        children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("form", { className: "flex gap-4 relative", onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full px-2 py-1", children: [
          /* @__PURE__ */ jsx(HeaderInputField, { title: "Title", description: "A unique task that represents your abilty in style. Let it stand out in the crowd!", className: "mb-4", required: true }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "title",
                name: "title",
                value: data.title,
                className: "block w-full",
                autoComplete: "title",
                placeholder: "Enter your task's title",
                isFocused: true,
                onChange: (e) => setData("title", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2 text-[#fff]" })
          ] }),
          /* @__PURE__ */ jsx(HeaderInputField, { title: "Description", description: "Capture the essence of your task in a few sentences. What makes it special?", className: "my-4", required: true }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              TextAreaInput,
              {
                id: "description",
                type: "text",
                name: "description",
                value: data.description,
                className: "block w-full h-64",
                placeholder: "Enter your description",
                autoComplete: "description",
                onChange: (e) => setData("description", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2 text-[#fff]" })
          ] }),
          /* @__PURE__ */ jsx(HeaderInputField, { title: "Due at", description: "Make this more chalange your kind", className: "my-4", required: true }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "due_at",
                name: "due_at",
                type: "date",
                value: data.due_at,
                className: "block w-full",
                autoComplete: "due_at",
                placeholder: "Enter your task's due_at",
                isFocused: true,
                onChange: (e) => setData("due_at", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.due_at, className: "mt-2 text-[#fff]" })
          ] }),
          /* @__PURE__ */ jsx(HeaderInputField, { title: "Category", description: "What is your skill to handle this challenge", className: "my-4", required: true }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxs(
              OptionInput,
              {
                id: "category",
                name: "category",
                type: "date",
                value: data.category,
                className: "block w-full",
                autoComplete: "category",
                placeholder: "Enter your task's category",
                isFocused: true,
                onChange: (e) => setData("category", e.target.value),
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "none", children: "None" }),
                  /* @__PURE__ */ jsx("option", { value: skills[3].name, children: skills[3].name }),
                  /* @__PURE__ */ jsx("option", { value: skills[4].name, children: skills[4].name })
                ]
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.category, className: "mt-2 text-[#fff]" })
          ] }),
          /* @__PURE__ */ jsx(HeaderInputField, { title: "Dificult", description: "Chalange your self with high risk, high reward", className: "my-4", required: true }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxs(
              OptionInput,
              {
                id: "difficult",
                name: "difficult",
                type: "date",
                value: data.difficult,
                className: "block w-full",
                autoComplete: "difficult",
                placeholder: "Enter your task's difficult",
                isFocused: true,
                onChange: (e) => setData("difficult", e.target.value),
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "easy", children: "Easy" }),
                  /* @__PURE__ */ jsx("option", { value: "normal", children: "Normal" }),
                  /* @__PURE__ */ jsx("option", { value: "hard", children: "Hard" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.difficult, className: "mt-2 text-[#fff]" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-16 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Add" }) })
        ] }) }) })
      }
    ) })
  ] });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
function Pagination({ links, className }) {
  return /* @__PURE__ */ jsx("nav", { className: "h-full w-full flex justify-end gap-2 " + className, children: links == null ? void 0 : links.map((link, index) => {
    return /* @__PURE__ */ jsx(
      Link,
      {
        className: "inline-flex justify-center items-center min-w-16 min-h-12 p-4 bg-beyours-650 border-beyours-600 border-[1px] rounded-md box-border transition-all ease-in-out duration-300 hover:bg-beyours-600 " + (link.active ? "bg-beyours-750 " : "") + (!link.url ? "opacity-40 cursor-not-allowed hover:bg-beyours-650 " : ""),
        href: link.url,
        dangerouslySetInnerHTML: { __html: link.label }
      },
      index
    );
  }) });
}
function Index({ tasks }) {
  const [searchValue, setSearchValue] = useState("");
  console.log(tasks);
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Task" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 pb-24 w-full py-16 h-full md:pb-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-2 border-b-beyours-600 border-b-[1px]", children: [
        /* @__PURE__ */ jsx(HeaderSection, { title: "Task", subTitle: "All task" }),
        /* @__PURE__ */ jsx(
          PrimaryNavigationButton,
          {
            href: route("task.create"),
            className: "!w-fit !h-fit !p-[.5rem]",
            children: /* @__PURE__ */ jsx(IconAdd, { className: "size-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex w-full", children: /* @__PURE__ */ jsx(
        SearchBar,
        {
          className: "w-full",
          placeholder: "Search for task",
          Icon: IconSearch,
          eventHandler: searchHandler
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "w-full h-4/5 box-border bg-beyours-700 rounded-md relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full max-h-full overflow-y-auto block", children: [
          /* @__PURE__ */ jsxs("table", { className: "w-full h-full table-fixed border-collapse", children: [
            /* @__PURE__ */ jsx("thead", { className: "border-b-[2px] h-12 border-b-beyours-600 bg-beyours-650 sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "h-16", children: [
              /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-start font-normal", children: "Title" }),
              /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-start font-normal hidden xl:table-cell", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-start font-normal hidden xl:table-cell", children: "Assign By" }),
              /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-start font-normal hidden xl:table-cell", children: "Due At" }),
              /* @__PURE__ */ jsx("th", { className: "py-6 px-8 text-end w-40 font-normal", children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "text-beyours-150", children: tasks.data.filter(
              (task) => searchValue ? task.title.toLowerCase().includes(searchValue.toLowerCase()) : task
            ).map((task) => {
              return /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsxs("td", { className: "py-6 px-8", children: [
                  task.title,
                  /* @__PURE__ */ jsxs("dl", { className: "xl:hidden flex gap-3", children: [
                    /* @__PURE__ */ jsx("dt", { className: "sr-only", children: "Status" }),
                    /* @__PURE__ */ jsx("dd", { className: "mt-4 ", children: /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "p-2 text-white rounded-md " + TASK_STATUS_CLASS_MAP[task.assignTo.pivot.done],
                        children: TASK_STATUS_TEXT_MAP[task.assignTo.pivot.done]
                      }
                    ) }),
                    /* @__PURE__ */ jsx("dt", { className: "sr-only", children: "Assign By" }),
                    /* @__PURE__ */ jsxs("dd", { className: "mt-4 ", children: [
                      "| ",
                      task.assignBy.fullname,
                      " |"
                    ] }),
                    /* @__PURE__ */ jsx("dt", { className: "sr-only", children: "Due At" }),
                    /* @__PURE__ */ jsx("dd", { className: "mt-4 ", children: task.due_at ? task.due_at : "Free" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-6 px-8 hidden xl:table-cell", children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "p-2 text-white rounded-md " + TASK_STATUS_CLASS_MAP[task.assignTo.pivot.done],
                    children: TASK_STATUS_TEXT_MAP[task.assignTo.pivot.done]
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "py-6 px-8 hidden xl:table-cell", children: task.assignBy.fullname }),
                /* @__PURE__ */ jsx("td", { className: "py-6 px-8 hidden xl:table-cell", children: task.due_at ? task.due_at : "Free" }),
                /* @__PURE__ */ jsx("td", { className: "py-6 px-8 ", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full flex justify-end", children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    className: "rounded-full bg-beyours-1100 border-[1px] border-beyours-900 p-[4px] hover:bg-beyours-900 hover:scale-110 transition-all ease-in-out duration-300 ",
                    href: route("task.show", task.id),
                    children: /* @__PURE__ */ jsx(IconDetail, { className: "stroke-white" })
                  }
                ) }) })
              ] }, task.id);
            }) })
          ] }),
          tasks.data.filter(
            (task) => searchValue ? task.title.toLowerCase().includes(searchValue.toLowerCase()) : task
          ).length === 0 && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full h-full min-h-96", children: /* @__PURE__ */ jsx(
            "span",
            {
              className: "py-6 px-8 text-center text-beyours-300 italic",
              children: "There is no task matching your search or created."
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex absolute bottom-0 bg-beyours-650 border-t-beyours-600 border-t-[1px] px-6 py-4 h-20 box-border", children: /* @__PURE__ */ jsx(Pagination, { links: tasks.meta.links }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function Show({ task }) {
  console.log(task);
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex justify-center h-fit w-fit overflow-y-scroll ",
        children: [
          /* @__PURE__ */ jsx(Head, { title: "Detail" }),
          /* @__PURE__ */ jsx("table", { className: "border-collapse table-fixed w-fit bg-beyours-700 rounded-md p-4 border-[1px] border-beyours-550", children: /* @__PURE__ */ jsxs("tbody", { className: "text-white", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-4 px-8 border-beyours-550 border-[1px] xl:w-[20%]", children: "Title" }),
              /* @__PURE__ */ jsx("td", { className: "py-4 px-8", children: task.title })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-4 px-8 border-beyours-550 border-[1px]", children: "Description" }),
              /* @__PURE__ */ jsx("td", { className: "py-4 px-8", children: task.description })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-4 px-8 border-beyours-550 border-[1px]", children: "Due at" }),
              /* @__PURE__ */ jsx("td", { className: "py-4 px-8", children: task.due_at })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-4 px-8 border-beyours-550 border-[1px]", children: "Status" }),
              /* @__PURE__ */ jsxs("td", { className: "p-8", children: [
                " ",
                /* @__PURE__ */ jsx("span", { className: TASK_STATUS_CLASS_MAP[task.assignTo || "Present"] + " p-2 text-white rounded-md", children: TASK_STATUS_TEXT_MAP[task.assignTo || "Present"] || "Present" })
              ] })
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: "p-4 bg-beyours-550 rounded-md inline-block box-border m-4",
        href: route("task.destroy", [task.id]),
        method: "delete",
        children: "Done"
      }
    )
  ] });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    var _a, _b, _c, _d;
    (_a = document.getElementById("screenshot-container")) == null ? void 0 : _a.classList.add("!hidden");
    (_b = document.getElementById("docs-card")) == null ? void 0 : _b.classList.add("!row-span-1");
    (_c = document.getElementById("docs-card-content")) == null ? void 0 : _c.classList.add("!flex-row");
    (_d = document.getElementById("background")) == null ? void 0 : _d.classList.add("!hidden");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 text-black/50 dark:bg-black dark:text-white/50", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          id: "background",
          className: "absolute -left-20 top-0 max-w-[877px]",
          src: "https://laravel.com/assets/img/welcome/background.svg"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl px-6 lg:max-w-7xl", children: [
        /* @__PURE__ */ jsxs("header", { className: "grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex lg:col-start-2 lg:justify-center", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]",
              viewBox: "0 0 62 65",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z",
                  fill: "currentColor"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("nav", { className: "-mx-3 flex flex-1 justify-end", children: auth.user ? /* @__PURE__ */ jsx(
            Link,
            {
              href: route("dashboard"),
              className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
              children: "Dashboard"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("login"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Log in"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Register"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "mt-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2 lg:gap-8", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel.com/docs",
              id: "docs-card",
              className: "flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    id: "screenshot-container",
                    className: "relative flex w-full flex-1 items-stretch",
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-light.svg",
                          alt: "Laravel documentation screenshot",
                          className: "aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden",
                          onError: handleImageError
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-dark.svg",
                          alt: "Laravel documentation screenshot",
                          className: "hidden aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-6 lg:items-end", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      id: "docs-card-content",
                      className: "flex items-start gap-6 lg:flex-col",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            className: "size-5 sm:size-6",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  fill: "#FF2D20",
                                  d: "M23 4a1 1 0 0 0-1.447-.894L12.224 7.77a.5.5 0 0 1-.448 0L2.447 3.106A1 1 0 0 0 1 4v13.382a1.99 1.99 0 0 0 1.105 1.79l9.448 4.728c.14.065.293.1.447.1.154-.005.306-.04.447-.105l9.453-4.724a1.99 1.99 0 0 0 1.1-1.789V4ZM3 6.023a.25.25 0 0 1 .362-.223l7.5 3.75a.251.251 0 0 1 .138.223v11.2a.25.25 0 0 1-.362.224l-7.5-3.75a.25.25 0 0 1-.138-.22V6.023Zm18 11.2a.25.25 0 0 1-.138.224l-7.5 3.75a.249.249 0 0 1-.329-.099.249.249 0 0 1-.033-.12V9.772a.251.251 0 0 1 .138-.224l7.5-3.75a.25.25 0 0 1 .362.224v11.2Z"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  fill: "#FF2D20",
                                  d: "m3.55 1.893 8 4.048a1.008 1.008 0 0 0 .9 0l8-4.048a1 1 0 0 0-.9-1.785l-7.322 3.706a.506.506 0 0 1-.452 0L4.454.108a1 1 0 0 0-.9 1.785H3.55Z"
                                }
                              )
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5 lg:pt-0", children: [
                          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Documentation" }),
                          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end." })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "size-6 shrink-0 stroke-[#FF2D20]",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laracasts.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M24 8.25a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5-2.5v-12Zm-7.765 5.868a1.221 1.221 0 0 1 0 2.264l-6.626 2.776A1.153 1.153 0 0 1 8 18.123v-5.746a1.151 1.151 0 0 1 1.609-1.035l6.626 2.776ZM19.564 1.677a.25.25 0 0 0-.177-.427H15.6a.106.106 0 0 0-.072.03l-4.54 4.543a.25.25 0 0 0 .177.427h3.783c.027 0 .054-.01.073-.03l4.543-4.543ZM22.071 1.318a.047.047 0 0 0-.045.013l-4.492 4.492a.249.249 0 0 0 .038.385.25.25 0 0 0 .14.042h5.784a.5.5 0 0 0 .5-.5v-2a2.5 2.5 0 0 0-1.925-2.432ZM13.014 1.677a.25.25 0 0 0-.178-.427H9.101a.106.106 0 0 0-.073.03l-4.54 4.543a.25.25 0 0 0 .177.427H8.4a.106.106 0 0 0 .073-.03l4.54-4.543ZM6.513 1.677a.25.25 0 0 0-.177-.427H2.5A2.5 2.5 0 0 0 0 3.75v2a.5.5 0 0 0 .5.5h1.4a.106.106 0 0 0 .073-.03l4.54-4.543Z" }) })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laracasts" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel-news.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsxs("g", { fill: "#FF2D20", children: [
                      /* @__PURE__ */ jsx("path", { d: "M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" })
                    ] })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laravel News" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800", children: [
            /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "size-5 sm:size-6",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M16.597 12.635a.247.247 0 0 0-.08-.237 2.234 2.234 0 0 1-.769-1.68c.001-.195.03-.39.084-.578a.25.25 0 0 0-.09-.267 8.8 8.8 0 0 0-4.826-1.66.25.25 0 0 0-.268.181 2.5 2.5 0 0 1-2.4 1.824.045.045 0 0 0-.045.037 12.255 12.255 0 0 0-.093 3.86.251.251 0 0 0 .208.214c2.22.366 4.367 1.08 6.362 2.118a.252.252 0 0 0 .32-.079 10.09 10.09 0 0 0 1.597-3.733ZM13.616 17.968a.25.25 0 0 0-.063-.407A19.697 19.697 0 0 0 8.91 15.98a.25.25 0 0 0-.287.325c.151.455.334.898.548 1.328.437.827.981 1.594 1.619 2.28a.249.249 0 0 0 .32.044 29.13 29.13 0 0 0 2.506-1.99ZM6.303 14.105a.25.25 0 0 0 .265-.274 13.048 13.048 0 0 1 .205-4.045.062.062 0 0 0-.022-.07 2.5 2.5 0 0 1-.777-.982.25.25 0 0 0-.271-.149 11 11 0 0 0-5.6 2.815.255.255 0 0 0-.075.163c-.008.135-.02.27-.02.406.002.8.084 1.598.246 2.381a.25.25 0 0 0 .303.193 19.924 19.924 0 0 1 5.746-.438ZM9.228 20.914a.25.25 0 0 0 .1-.393 11.53 11.53 0 0 1-1.5-2.22 12.238 12.238 0 0 1-.91-2.465.248.248 0 0 0-.22-.187 18.876 18.876 0 0 0-5.69.33.249.249 0 0 0-.179.336c.838 2.142 2.272 4 4.132 5.353a.254.254 0 0 0 .15.048c1.41-.01 2.807-.282 4.117-.802ZM18.93 12.957l-.005-.008a.25.25 0 0 0-.268-.082 2.21 2.21 0 0 1-.41.081.25.25 0 0 0-.217.2c-.582 2.66-2.127 5.35-5.75 7.843a.248.248 0 0 0-.09.299.25.25 0 0 0 .065.091 28.703 28.703 0 0 0 2.662 2.12.246.246 0 0 0 .209.037c2.579-.701 4.85-2.242 6.456-4.378a.25.25 0 0 0 .048-.189 13.51 13.51 0 0 0-2.7-6.014ZM5.702 7.058a.254.254 0 0 0 .2-.165A2.488 2.488 0 0 1 7.98 5.245a.093.093 0 0 0 .078-.062 19.734 19.734 0 0 1 3.055-4.74.25.25 0 0 0-.21-.41 12.009 12.009 0 0 0-10.4 8.558.25.25 0 0 0 .373.281 12.912 12.912 0 0 1 4.826-1.814ZM10.773 22.052a.25.25 0 0 0-.28-.046c-.758.356-1.55.635-2.365.833a.25.25 0 0 0-.022.48c1.252.43 2.568.65 3.893.65.1 0 .2 0 .3-.008a.25.25 0 0 0 .147-.444c-.526-.424-1.1-.917-1.673-1.465ZM18.744 8.436a.249.249 0 0 0 .15.228 2.246 2.246 0 0 1 1.352 2.054c0 .337-.08.67-.23.972a.25.25 0 0 0 .042.28l.007.009a15.016 15.016 0 0 1 2.52 4.6.25.25 0 0 0 .37.132.25.25 0 0 0 .096-.114c.623-1.464.944-3.039.945-4.63a12.005 12.005 0 0 0-5.78-10.258.25.25 0 0 0-.373.274c.547 2.109.85 4.274.901 6.453ZM9.61 5.38a.25.25 0 0 0 .08.31c.34.24.616.561.8.935a.25.25 0 0 0 .3.127.631.631 0 0 1 .206-.034c2.054.078 4.036.772 5.69 1.991a.251.251 0 0 0 .267.024c.046-.024.093-.047.141-.067a.25.25 0 0 0 .151-.23A29.98 29.98 0 0 0 15.957.764a.25.25 0 0 0-.16-.164 11.924 11.924 0 0 0-2.21-.518.252.252 0 0 0-.215.076A22.456 22.456 0 0 0 9.61 5.38Z" }) })
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Vibrant Ecosystem" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm/relaxed", children: [
                "Laravel's robust library of first-party tools and libraries, such as",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://forge.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white dark:focus-visible:ring-[#FF2D20]",
                    children: "Forge"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://vapor.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Vapor"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://nova.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Nova"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://envoyer.io",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Envoyer"
                  }
                ),
                ", and",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://herd.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Herd"
                  }
                ),
                " ",
                "help you take your projects to the next level. Pair them with powerful open source libraries like",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/billing",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Cashier"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/dusk",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Dusk"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/broadcasting",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Echo"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/horizon",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Horizon"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/sanctum",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Sanctum"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/telescope",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Telescope"
                  }
                ),
                ", and more."
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("footer", { className: "py-16 text-center text-sm text-black dark:text-white/70", children: [
          "Laravel v",
          laravelVersion,
          " (PHP v",
          phpVersion,
          ")"
        ] })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_0, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_1, "./Pages/Auth/Login.jsx": __vite_glob_0_2, "./Pages/Auth/Register.jsx": __vite_glob_0_3, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_4, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_5, "./Pages/Character/Create.jsx": __vite_glob_0_6, "./Pages/Character/Index.jsx": __vite_glob_0_7, "./Pages/Community/Attendance/Create.jsx": __vite_glob_0_8, "./Pages/Community/Attendance/Index.jsx": __vite_glob_0_9, "./Pages/Community/Attendance/Report/Index.jsx": __vite_glob_0_10, "./Pages/Community/Attendance/Show.jsx": __vite_glob_0_11, "./Pages/Community/Create.jsx": __vite_glob_0_12, "./Pages/Community/Index.jsx": __vite_glob_0_13, "./Pages/Community/Show.jsx": __vite_glob_0_14, "./Pages/Dashboard/Index.jsx": __vite_glob_0_15, "./Pages/Profile/DashboardProfile.jsx": __vite_glob_0_16, "./Pages/Profile/Edit.jsx": __vite_glob_0_17, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_18, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_19, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_20, "./Pages/Task/Create.jsx": __vite_glob_0_21, "./Pages/Task/Index.jsx": __vite_glob_0_22, "./Pages/Task/Show.jsx": __vite_glob_0_23, "./Pages/Welcome.jsx": __vite_glob_0_24 });
      return pages[`./Pages/${name}.jsx`];
    }
  })
);
