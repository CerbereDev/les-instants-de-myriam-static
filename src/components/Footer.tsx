const Footer = () => {
  return (
    <footer className="bg-charcoal text-primary-foreground/60 py-8">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="font-serif text-xl text-primary-foreground">
            Les Instants de Myriam
          </a>
          <p className="text-sm text-center md:text-right">
            © {new Date().getFullYear()} Les Instants de Myriam. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
