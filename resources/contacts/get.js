if (!me || me.id !== this.creator) {
    cancel(null, 404);
} else {
    hide('creator');
}