function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer">{text}</a>;
}

function Footer() {
  return (
    <footer>
      <h2>Made with sweat and hard work by Alex</h2>
    </footer >
  );
}

export default Footer;
