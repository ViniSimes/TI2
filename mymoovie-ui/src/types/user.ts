export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  userName: string;
  email: string;
  password: string;
}

export interface UserProps {
  id: number;
  nomeUsuario: string;
  isPremium: boolean;
  email: string;
}

export interface FollowResponseProps {
  status: boolean;
  mensagem: string;
}
