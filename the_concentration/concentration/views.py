import os

from django.http import Http404
from django.shortcuts import redirect
from django.views.generic import TemplateView

import common.concentration_utils as utils


class Home(TemplateView):
    template_name = os.path.join('concentration', 'index.html')

    def dispatch(self, request, *args, **kwargs):
        kw_cards = kwargs.get('card_num')
        sess_cards = request.session.get('card_num')

        if not sess_cards and not kw_cards:  # Start a new game if it's a new user
            return redirect('concentration:home', card_num=8)
        elif sess_cards and not kw_cards:  # Get session if no url param is given
            return redirect('concentration:home', card_num=sess_cards)
        elif kw_cards not in [8, 14, 20, 30]:  # Return 404 if url param is invalid
            raise Http404('Please select a valid number')
        elif sess_cards and kw_cards:  # Override session if url param is given and both are different
            if sess_cards != kw_cards:
                request.session['card_num'] = kw_cards
                request.session.save()
                return redirect('concentration:home', card_num=kw_cards)

        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Get session and assign to context
        card_num = kwargs.get('card_num')
        session = utils.new_game(self.request.session, card_num)
        context['cards'] = session['cards']
        context['card_num'] = session['card_num']

        return context
