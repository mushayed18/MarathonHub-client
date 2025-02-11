const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-slate-200 dark:bg-gray-800 rounded p-20">
        <div>
          <h3 className="font-bold text-2xl text-sky-500">Marathon Hub</h3>
          <p>
            MH Industries Ltd.
            Providing reliable services since 2024
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl text-sky-500">Contact Us</h3>
          <p>Email: marathonHub@gmail.com</p>
          <p>Phone: 0123456789</p>
        </div>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Marathon Hub Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
