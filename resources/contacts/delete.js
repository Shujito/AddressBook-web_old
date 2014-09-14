if (!me) {
    cancel('Sign in first', 401);
}
if (me.id !== this.creator) {
    cancel('That\'s not yours', 401);
}
