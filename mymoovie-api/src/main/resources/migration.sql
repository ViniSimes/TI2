CREATE TABLE public.usuario (
  id SERIAL PRIMARY KEY,
  nome_usuario VARCHAR(50),
  email VARCHAR(50) UNIQUE,
  senha VARCHAR(150),
  is_premium boolean
);

CREATE TABLE public.seguidor (
  id SERIAL PRIMARY KEY,
  usuario_que_segue INT,
  usuario_seguido INT,
  FOREIGN KEY (usuario_que_segue) REFERENCES usuario(id),
  FOREIGN KEY (usuario_seguido) REFERENCES usuario(id)
);

CREATE TABLE public.postagem (
  id SERIAL PRIMARY KEY,
  nota INT CHECK (nota >= 1 AND nota <= 10),
  comentario TEXT,
  codigo_filme VARCHAR(20),
  quantidade_curtidas INT,
  destaque boolean,
  isImpulsionado boolean,
  codigo_usuario INT,
  FOREIGN KEY (codigo_usuario) REFERENCES usuario(id)
);

CREATE TABLE public.comentario (
  id SERIAL PRIMARY KEY,
  descricao TEXT,
  codigo_usuario INT,
  codigo_postagem INT,
  quantidade_curtidas INT,
  FOREIGN KEY (codigo_usuario) REFERENCES usuario(id),
  FOREIGN KEY (codigo_postagem) REFERENCES postagem(id)
);