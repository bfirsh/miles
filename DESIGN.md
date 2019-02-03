# Design principles

- **User-driven design.** Observe how users want to build things, then work back from that.
- **Individuals and small teams first.** Miles doesn't scale, and that's fine.
- **Use boring technology.** We need a stable platform to build upon.
- **No magic.** Explicit is better than implicit. It should feel like you're [wiring something up](https://en.wikipedia.org/wiki/Moog_modular_synthesizer) and can see the inner workings. More like Django, less like Rails. Similarly, [no HOCs](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).
- **Do the hard work to make the impossible possible.** If there are technical constraints that mean we can't build what users want, then fix the technical constraints.
- **Batteries included, but removeable.** Works out of the box, but you can swap out components as needed.
- **Secure by default.** Everything you need for a real app works out of the box.
- **Keep it simple.** 50 lines of straightforward, readable code is better than 10 lines of magic that nobody can understand. ([source](https://github.com/moby/moby/blob/master/project/PRINCIPLES.md))
