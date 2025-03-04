function Button({ disabled, onClick, children }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="font-mgs1 active:text-shadow-button h-16 w-fit rounded-2xl border-2 bg-slate-300 p-4 text-3xl tracking-wider hover:shadow-2xl hover:shadow-purple-800 active:transform-[translateY(3px)] active:shadow-none active:ring-2 active:ring-purple-800 disabled:hover:text-red-500 disabled:hover:ring-2 disabled:hover:ring-red-500"
    >
      {children}
    </button>
  );
}

export default Button;
