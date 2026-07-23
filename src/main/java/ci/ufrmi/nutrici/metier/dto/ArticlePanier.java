package ci.ufrmi.nutrici.metier.dto;

public class ArticlePanier {

    private String reference;
    private int quantite;

    public ArticlePanier() {
    }

    public ArticlePanier(String reference, int quantite) {
        this.reference = reference;
        this.quantite = quantite;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
