import val from "../assets/val.jpeg";
import george from "../assets/george.jpg";
import emma from "../assets/emma.jpg";
import brenda from "../assets/brenda.jpg";
import ayugu from "../assets/ayugu.jpg";
import alex from "../assets/alex.jpg";
import directorImg from "../assets/director.jpg";

function BoardMembers() {
  const members = [
    { name: "George Ariya", img: george, role: "Chairman" },
    { name: "Veronica Bitta", img: directorImg, role: ["Executive Director", "Secretary", "Head of the secretariat"] },
    { name: "John Ayugu", img: ayugu, role: "Treasurer" },
    { name: "Emma Otieno", img: emma, role: "Pediatric Clinician" },
    { name: "Brenda Sinzore", img: brenda, role: "Board Member" },
    { name: "Valerie Okello", img: val, role: "Board Member" },
    { name: "Alex Liyayi", img: alex, role: "Board Member" },
  ];

  return (
    <section className="board-members-section">
      <article className="board-members-card">
        <h2>Meet Our Board Members</h2>
        <div className="board-members-grid">
          {members.map((m) => (
            <div key={m.name} className="board-member">
              <img src={m.img} alt={m.name} />
              <h3>{m.name}</h3>
              {Array.isArray(m.role) ? (
                <div className="role">
                  {m.role.map((r) => (
                    <span key={r} className="role-item">{r}</span>
                  ))}
                </div>
              ) : (
                <p className="role">{m.role}</p>
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default BoardMembers;
