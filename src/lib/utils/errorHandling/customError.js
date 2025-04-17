// Permet d'envoyer un message d'erreur personnalisé dans le front au lieu du message classique quand une erreur est attrapée

export default class AppError extends Error{
  constructor(message ="Une erreur a été détecté" ){
  super(message)
  this.name = "AppError"
  }
}