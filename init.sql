USE devoirs;
CREATE TABLE devoir (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  date_debut DATE,
  date_rendu DATE,
  matiere VARCHAR(255),
  professeur VARCHAR(255)
);
