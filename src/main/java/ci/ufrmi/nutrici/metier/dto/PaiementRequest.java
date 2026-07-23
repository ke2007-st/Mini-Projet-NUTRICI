package ci.ufrmi.nutrici.metier.dto;

import java.util.ArrayList;
import java.util.List;

public class PaiementRequest {

    private String clientEmail;
    private String operateur; // Wave, Orange Money (simule)
    private List<ArticlePanier> articles = new ArrayList<>();

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public String getOperateur() {
        return operateur;
    }

    public void setOperateur(String operateur) {
        this.operateur = operateur;
    }

    public List<ArticlePanier> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticlePanier> articles) {
        this.articles = articles;
    }
}
