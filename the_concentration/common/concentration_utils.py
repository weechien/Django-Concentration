import uuid
from random import shuffle, randint

FONT_AWESOME_ICONS = ['wrench', 'umbrella', 'truck', 'trophy', 'tree', 'trash', 'thumbs-up', 'sun', 'star', 'snowflake',
                      'smile', 'shopping-bag', 'shopping-cart', 'shower', 'rocket', 'registered', 'puzzle-piece', 'power-off', 'plane', 'paw',
                      'paper-plane', 'mouse-pointer', 'music', 'moon', 'meh', 'magnet', 'magic', 'leaf', 'keyboard', 'key',
                      'image', 'hourglass-half', 'headphones', 'home', 'hand-spock', 'hand-peace', 'graduation-cap', 'gift', 'heart', 'globe',
                      'gamepad', 'futbol', 'flask', 'flag-checkered', 'fire-extinguisher', 'film', 'flag', 'fighter-jet', 'eye', 'compass',
                      'child', 'birthday-cake', 'bell', 'bath', 'coffee', 'book', 'bicycle', 'bug', 'bolt', 'bed',
                      'beer', 'bomb', 'binoculars', 'camera-retro', 'anchor', 'bus', 'envelope', 'briefcase']


# Convert all cards to a dictionary list
def generate_card_objects(card_pairs):
    cards = []

    for card_pair in card_pairs:
        card_obj = {
            'id': uuid.uuid4().hex,
            'value': FONT_AWESOME_ICONS[card_pair],
            'hidden': True,
        }
        cards.append(card_obj)
    return cards


# Reset the game session
def new_game(session, card_num):
    session['card_num'] = card_num

    chosen_indexes = []
    icon_indexes = list(range(len(FONT_AWESOME_ICONS)))

    for _ in range(card_num // 2):
        index = randint(0, len(icon_indexes) - 1)
        chosen_indexes.append(icon_indexes[index])
        icon_indexes.pop(index)


    card_pairs = chosen_indexes + chosen_indexes
    shuffle(card_pairs)
    session['cards'] = generate_card_objects(card_pairs)

    session.save()
    return session
