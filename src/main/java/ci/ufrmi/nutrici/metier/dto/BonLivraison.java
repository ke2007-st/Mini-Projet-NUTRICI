package ci.ufrmi.nutrici.metier.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BonLivraison {

    private String numeroCommande;
    private Date dateCommande;
    private String statut;
    private String clientNom;
    private String clientEmail;
    private String clientTelephone;
    private String clientAdresse;
    private List<LigneBon> lignes = new ArrayList<>();
    private float total;

    public String getNumeroCommande() {
        return numeroCommande;
    }

    public void setNumeroCommande(String numeroCommande) {
        this.numeroCommande = numeroCommande;
    }

    public Date getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(Date dateCommande) {
        this.dateCommande = dateCommande;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getClientNom() {
        return clientNom;
    }

    public void setClientNom(String clientNom) {
        this.clientNom = clientNom;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public String getClientTelephone() {
        return clientTelephone;
    }

    public void setClientTelephone(String clientTelephone) {
        this.clientTelephone = clientTelephone;
    }

    public String getClientAdresse() {
        return clientAdresse;
    }

    public void setClientAdresse(String clientAdresse) {
        this.clientAdresse = clientAdresse;
    }

    public List<LigneBon> getLignes() {
        return lignes;
    }

    public void setLignes(List<LigneBon> lignes) {
        this.lignes = lignes;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public static class LigneBon {
        private String reference;
        private String nomProduit;
        private int quantite;
        private float prixFacture;
        private float sousTotal;

        public String getReference() {
            return reference;
        }

        public void setReference(String reference) {
            this.reference = reference;
        }

        public String getNomProduit() {
            return nomProduit;
        }

        public void setNomProduit(String nomProduit) {
            this.nomProduit = nomProduit;
        }

        public int getQuantite() {
            return quantite;
        }

        public void setQuantite(int quantite) {
            this.quantite = quantite;
        }

        public float getPrixFacture() {
            return prixFacture;
        }

        public void setPrixFacture(float prixFacture) {
            this.prixFacture = prixFacture;
        }

        public float getSousTotal() {
            return sousTotal;
        }

        public void setSousTotal(float sousTotal) {
            this.sousTotal = sousTotal;
        }
    }
}
